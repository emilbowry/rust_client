// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  // 'useState' is a React Hook to hold our server message.
  // It starts as an empty string.
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // This function will be called when the button is clicked.
  const fetchDataFromServer = () => {
    // Reset previous state
    setMessage('');
    setError('');

    // Use the browser's built-in 'fetch' API to make a request
    // to our Rust server's endpoint.
    fetch('http://localhost:7878/api/message')
      .then(response => {
        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If successful, parse the JSON body
        return response.json();
      })
      .then(data => {
        // Update our state with the message from the server.
        // React will automatically re-render the component to display it.
        setMessage(`Framework: ${data.framework}, Status: ${data.status}`);
      })
      .catch(err => {
        // If anything goes wrong (network error, server down, etc.),
        // update the error state.
        console.error("Fetch error:", err);
        setError('Failed to fetch data. Is the Rust server running? Check the c>
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Client for Rusty Web</h1>
        <button onClick={fetchDataFromServer}>
          Get Message from Server
        </button>
        
        {/* Conditionally display the message if it exists */}
        {message && (
          <div className="message-box">
            <p><strong>Success! Received from server:</strong></p>
            <p><code>{message}</code></p>
          </div>
        )}

        {/* Conditionally display the error if it exists */}
        {error && (
          <div className="error-box">
            <p><strong>Error:</strong></p>
            <p><code>{error}</code></p>
          </div>
        )}
      </header>
    </div>
  );
}
