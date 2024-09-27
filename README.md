
# LangHub

**LangHub** is an innovative platform designed to enhance language learning and communication through interactive games and tools. It caters to users of all levels, providing engaging ways to expand vocabulary, practice grammar, and communicate across language barriers.

## Table of Contents
1. [Problem Statement](#problem-statement)
2. [Solution](#solution)
3. [Challenges](#challenges)
4. [Features](#features)
5. [Live Demo](#live-demo)
6. [Installation](#installation)
7. [Usage](#usage)
8. [Technologies Used](#technologies-used)
9. [Project Structure](#project-structure)
10. [Contributing](#contributing)
11. [License](#license)

## Problem Statement
In our increasingly connected world, learning new languages and communicating effectively can be a challenge. Language learners often struggle to find engaging, interactive tools to practice vocabulary and grammar. Furthermore, existing communication platforms do not offer seamless real-time translation or account for different time zones, making cross-language interaction difficult.

## Solution
LangHub provides an all-in-one platform to address these challenges. It offers interactive games for language practice and tools that enable seamless communication across different languages. With real-time multiplayer games, vocabulary builders, translation tools, and chat functionality, LangHub helps users improve their language skills while connecting with others around the globe.

## Challenges
- **API Limitations:** Initially, the Azure Translation API was used, but due to empty credits, I had to switch to the self-hosted LibreTranslate API.
- **Multiplayer Functionality:** Implementing real-time multiplayer in Word Scribble posed challenges, mainly due to the code being managed in a single file. Refactoring and improving logic flow was essential.
- **Planning and Organization:** I learned the importance of brainstorming, planning, and using flowcharts, which helped manage complex code and functionality.

## Features
- **WordMaster:** A word-guessing game where players guess words based on hints provided in multiple languages, ideal for language learners.
- **Translation Tool:** Translate text and various file formats with support for multiple languages, ensuring easy communication.
- **Word Scribble:** A real-time multiplayer game where players guess words in public or private rooms.
- **Vocabulary Builder:** Interactive guessing games that help users expand their vocabulary by introducing new words and meanings.
- **Sentence Builder:** A game where users arrange jumbled words into correct sentences, improving grammar and sentence structure.
- **Language Quiz:** Engaging quizzes that test users' understanding of grammar and language skills.
- **Chat with Translation:** A real-time chat feature that supports automatic translation, allowing users to communicate in different languages and time zones.

## Live Demo
- **Live Project:** [LangHub](http://langhub2.vercel.app)
- **Demo Video:** Watch Here (link to demo video)

## Installation
To get the project up and running locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/BeastxD7/LangHub.git
   ```
2. Navigate to the project directory:
   ```bash
   cd LangHub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
Once the server is running, you can access LangHub by navigating to [http://localhost:3000](http://localhost:3000) in your browser. Explore the features such as WordMaster, Word Scribble, chat, translation tools, and more!

## Technologies Used
- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB
- **APIs:** LibreTranslate (for translations)
- **Real-time Communication:** Socket.IO (for multiplayer games and chat)



## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (e.g., `git checkout -b feature-branch`).
3. Commit your changes (e.g., `git commit -m "Add some feature"`).
4. Push to the branch (e.g., `git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Links
- **Frontend GitHub Repository:** [LangHub Frontend](https://github.com/BeastxD7/LangHub.git)
- **Scribble Backend GitHub Repository:** [Socket.IO Backend](https://github.com/BeastxD7/socket.io.git)
- **Chat Backend GitHub Repository:** [Chat Backend](https://github.com/BeastxD7/chat-backend.git)
