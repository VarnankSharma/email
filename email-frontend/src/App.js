import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
//done
    try {
      // Replace 'http://localhost:3000' with your deployed backend URL
      const res = await axios.post('https://email-backend-ecru.vercel.app/api/send-email', {
        to: recipient,
        subject: subject,
        text: message,
      });

      setResponse(res.data.message); 
    } catch (error) {
      setResponse('Error sending email'); 
    }
  };

  return (
    <div>
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient:
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Send Email</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
};

export default App;
