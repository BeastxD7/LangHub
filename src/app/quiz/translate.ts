import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const translatePhrases = async (phrases: string[], language: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TRANSLATOR_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_TRANSLATOR_ENDPOINT;
    const location = process.env.NEXT_PUBLIC_TRANSLATOR_LOCATION;

    // Fetch translations for each phrase
    const responses = await Promise.all(phrases.map(async (phrase) => {
      return axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-Type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': language
        },
        data: [{ text: phrase }],
        responseType: 'json'
      });
    }));

    const correctAnswers = responses.map(response => response.data[0].translations[0].text);

    // Fetch additional translations for incorrect options
    const allPhrases = [...phrases, ...phrases, ...phrases]; // Repeat phrases to have more options
    const incorrectOptionsPromises = allPhrases.map(async (phrase) => {
      return axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-Type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': language
        },
        data: [{ text: phrase }],
        responseType: 'json'
      });
    });

    const incorrectOptionsResponses = await Promise.all(incorrectOptionsPromises);

    // Combine correct answers with incorrect options and create four choices
    const questions = responses.map((response, index) => {
      const correctAnswer = correctAnswers[index];
      const allOptions = incorrectOptionsResponses
        .flatMap((res) => res.data[0].translations.map((translation: any) => translation.text));

      // Filter out duplicates and select random options
      const uniqueOptions = Array.from(new Set([correctAnswer, ...allOptions])).slice(0, 4);
      const options = uniqueOptions.length < 4
        ? [...uniqueOptions, ...Array(4 - uniqueOptions.length).fill('')] // Fill with empty strings if not enough options
        : uniqueOptions;

      // Shuffle options to randomize their order
      const shuffledOptions = shuffleArray(options);

      return {
        phrase: phrases[index],
        options: shuffledOptions,
        correctAnswer: correctAnswer
      };
    });

    return questions;
  } catch (err) {
    console.error('Translation API error:', err);
    return [];
  }
};
