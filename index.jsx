import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const handleCreateIndex = () => {
    fetch('/createIndex/B2')
      .then((res) => res.text())
      .then((data) => setResponse(data))
      .catch((error) => console.log(error));
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append('botname', 'YourBotName');
    formData.append('filetype', 'YourFileType');
    formData.append('files', fileInputRef.current.files[0]);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => setResponse(data))
      .catch((error) => console.log(error));
  };

  const handleUseBot = () => {
    const formData = new FormData();
    formData.append('botname', 'YourBotName');
    formData.append('prompt', 'YourPromptText');

    fetch('/chatbot', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => setResponse(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button onClick={handleCreateIndex}>Create Index</button>
      <button onClick={handleUploadFile}>Upload File</button>
      <button onClick={handleUseBot}>Use Bot</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
