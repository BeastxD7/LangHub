"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Download,
  X,
  Type,
  File,
  Loader,
} from "lucide-react";
import Navbar from "./Navbar";

const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "sq", name: "Albanian" },
  { code: "ar", name: "Arabic" },
  { code: "az", name: "Azerbaijani" },
  { code: "bn", name: "Bengali" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "zh", name: "Chinese" },
  { code: "zt", name: "Chinese (traditional)" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hu", name: "Hungarian" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "ms", name: "Malay" },
  { code: "nb", name: "Norwegian" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "es", name: "Spanish" },
  { code: "sv", name: "Swedish" },
  { code: "tl", name: "Tagalog" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
];

const TranslationForm = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("auto");
  const [targetLanguage, setTargetLanguage] = useState<string>("en");
  const [text, setText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isFileMode, setIsFileMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (text) {
      setSourceLanguage("auto");
    }
  }, [text]);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TRANSLATE}`,
        {
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
        }
      );
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      setNotification("Error translating text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleTranslateFile = async () => {
    if (!selectedFile) {
      setNotification("No file selected. Please choose a file to translate.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("source", sourceLanguage);
    formData.append("target", targetLanguage);
    formData.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TRANSLATEFILE}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );
      setDownloadLink(response.data.translatedFileUrl.replace('http://', 'https://'));
      setNotification(
        "File translated successfully. You can now download the translated file."
      );
    } catch (error) {
      console.error("Error translating file:", error);
      setNotification("Error translating file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsFileMode(!isFileMode);
    setTranslatedText("");
    setDownloadLink(null);
    if (!isFileMode) {
      setSourceLanguage(supportedLanguages[0].code);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <Navbar />  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg p-8 relative">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          {!isFileMode ? `Text Translator` : `File Translator`}
        </h2>

        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMode}
            className={`px-4 py-2 rounded-md mr-2 ${
              !isFileMode
                ? "bg-purple-600 text-white"
                : "bg-gray-800 bg-opacity-50 text-gray-300"
            }`}>
            <Type className="inline-block mr-2" /> Text
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMode}
            className={`px-4 py-2 rounded-md ${
              isFileMode
                ? "bg-purple-600 text-white"
                : "bg-gray-800 bg-opacity-50 text-gray-300"
            }`}>
            <File className="inline-block mr-2" /> File
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Source Language
            </label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="block w-full p-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {!isFileMode && <option value="auto">Auto Detect</option>}
              {supportedLanguages.map((lang) => (
                <option
                  className="bg-gray-800"
                  key={lang.code}
                  value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="block w-full p-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {supportedLanguages.map((lang) => (
                <option
                  className="bg-gray-800"
                  key={lang.code}
                  value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isFileMode ? (
            <motion.div
              key="text-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Text to Translate
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="block w-full p-3 bg-gray-800 bg-opacity-50 text-white border border-gray-600 rounded-md focus:ring-2 outline-none focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Enter text to translate..."></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTranslate}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
                disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  <>
                    Translate <ArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>

              {translatedText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gray-800 bg-opacity-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Translated Text
                  </h3>
                  <p className="text-gray-200">{translatedText}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="file-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <label className="flex items-center justify-center w-full h-[150px] p-4 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-purple-500 transition-colors duration-300">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".txt, .odt, .odp, .docx, .pptx, .epub, .html"
                    className="hidden"
                  />
                  <FileText className="mr-2 text-gray-400" />
                  <span className="text-gray-400">
                    {selectedFile ? selectedFile.name : "Choose a file"}
                  </span>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTranslateFile}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
                disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin mr-2" />
                ) : (
                  <>
                    Translate File <ArrowRight className="ml-2" />
                  </>
                )}
              </motion.button>

              {downloadLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gray-800 bg-opacity-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Download Translated File
                  </h3>
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline flex items-center"
                    onClick={() =>
                      console.log(
                        `Attempting to download from: ${downloadLink}`
                      )
                    } // Log download attempt
                  >
                    <Download className="mr-2" /> Download Translated File
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-4 flex justify-center items-center">
              <div className="bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg flex items-center">
                <span>{notification}</span>
                <button
                  onClick={() => setNotification(null)}
                  className="ml-4 text-gray-400 hover:text-white transition-colors duration-300">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-xl">
            <Loader className="w-12 h-12 text-purple-600 animate-spin" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TranslationForm;
