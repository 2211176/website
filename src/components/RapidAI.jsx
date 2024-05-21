import React, { useState } from 'react';
import axios from 'axios';
import "./styles/RapidAI.css"; // Подключение CSS-файла

const GptChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://chat-gpt-43.p.rapidapi.com/?question=' + question, {
        headers: {
          'x-rapidapi-key': 'cdabd84c38msh6cff6bb9dff2437p18b303jsn987168002eb7',
          'x-rapidapi-host': 'chat-gpt-43.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container"> {/* Добавление класса для контейнера компонента */}
      <input type="text" value={question} onChange={handleQuestionChange} className="chat-input" /> {/* Добавление класса для поля ввода */}
      <button onClick={handleSubmit} className="chat-button">Send to ChatGPT</button> {/* Добавление класса для кнопки */}
      <div className="chat-answer">{answer}</div> {/* Добавление класса для отображения ответа */}
    </div>
  );
};

export default GptChatComponent;