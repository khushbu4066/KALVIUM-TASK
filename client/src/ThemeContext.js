// ThemeContext.js
import React, { createContext, useState } from 'react';

// Create the ThemeContext with default values
export const ThemeContext = createContext();

// ThemeProvider component to provide the context value
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  // Return the ThemeContext provider wrapping the children components
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
