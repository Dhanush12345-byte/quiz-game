// src/components/QuizGame.js
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['A: London', 'B: Paris', 'C: Berlin', 'D: Madrid'],
    answer: 'B: Paris',  // Correct answer is stored here
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['A: Earth', 'B: Mars', 'C: Jupiter', 'D: Venus'],
    answer: 'B: Mars',  // Correct answer is stored here
  },
  // Add more questions as needed
];

const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [message, setMessage] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleQRScan = () => {
    if (playerName) {
      setIsMobile(true);
    } else {
      setMessage('Please enter your name before starting the game.');
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (playerAnswer.trim() === '') {
      setMessage('Please enter an answer before submitting.');
      return;
    }

    // Check the answer based on the provided answer format
    const formattedAnswer = playerAnswer.trim();
    if (formattedAnswer === currentQuestion.answer.charAt(0)) { // Check only the option letter (A, B, C, D)
      setMessage(`Congratulations, ${playerName}! Your answer is correct!`);
      setTimeout(() => {
        setMessage('');
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        setPlayerAnswer('');
      }, 2000);
    } else {
      setMessage('Incorrect answer. Please try again.');
      setPlayerAnswer('');
    }
  };

  return (
    <div>
      {!isMobile ? (
        <div>
          <h2>Welcome to the KBC Game!</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={handleQRScan}>Start Game</button>
          {playerName && (
            <div>
              <h2>{currentQuestion.question}</h2>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <QRCodeCanvas value={`http://localhost:3000/?name=${playerName}`} size={128} />
              <p>Scan the QR code with your mobile device to join the game!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>{currentQuestion.question}</h2>
          <input
            type="text"
            placeholder="Enter your answer (A, B, C, D)"
            value={playerAnswer}
            onChange={(e) => setPlayerAnswer(e.target.value.toUpperCase())} // Convert to uppercase
          />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default QuizGame;
