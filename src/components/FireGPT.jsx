import React, { useState } from 'react';
import axios from 'axios';

function FireworksAIComponent() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
  
    const handleQuestionChange = (event) => {
      setQuestion(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('https://api.fireworksai.com/v1/models/mixtral-8x7b-instruct/completions', {
          prompt: question,
          max_tokens: 50, // Максимальное количество токенов в ответе
        }, {
          headers: {
            Authorization: 'Bearer 6BZUncmwoqIlNUJDMRlcdirGOFOQraQvU3r1iP0IHrR1hXrd',
            'Content-Type': 'application/json',
          },
        });
  
        setAnswer(response.data.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={question} onChange={handleQuestionChange} />
          <button type="submit">Отправить</button>
        </form>
        {answer && <p>{answer}</p>}
      </div>
    );
  }
  
  export default FireworksAIComponent;