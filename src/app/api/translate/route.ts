import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();
  
  const encodedText = encodeURIComponent(text);
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLanguage}`;

  try {
    const response = await axios.get(apiUrl);
    const translatedText = response.data.responseData.translatedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
