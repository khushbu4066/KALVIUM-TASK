// App.js
import React, { useState } from 'react';
import { ThemeProvider } from './ThemeContext'; // Importing ThemeProvider
import PDFViewer from './PDFViewer'; // Importing the PDFViewer component

function App() {
  const [role, setRole] = useState('viewer'); // Role could be 'admin' or 'viewer'
  const [roomId, setRoomId] = useState('1234'); // Room ID could be dynamic or fixed

  const handleRoleChange = (event) => {
    setRole(event.target.value); // Switch between 'admin' or 'viewer'
  };

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value); // Change the room ID dynamically
  };

  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <h1>PDF Viewer Application</h1>
        </header>

        <div style={{ padding: '10px' }}>
          {/* Role and Room ID Input */}
          <div>
            <label htmlFor="role">Choose Role: </label>
            <select id="role" onChange={handleRoleChange} value={role}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="roomId">Enter Room ID: </label>
            <input 
              type="text" 
              id="roomId" 
              value={roomId} 
              onChange={handleRoomIdChange} 
            />
          </div>
        </div>

        {/* PDFViewer Component */}
        <PDFViewer role={role} roomId={roomId} />

        {/* Theme Toggle Button */}
        <div style={{ padding: '10px' }}>
          <button onClick={() => {}}>Toggle Theme</button> {/* Attach toggleTheme function here */}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
