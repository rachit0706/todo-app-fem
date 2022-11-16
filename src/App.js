import './App.css';
import TodoPage from './components/TodoPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState({
    type: 'dark',
    buttonIcon: '../images/icon-sun.svg'
  });

  const toggleTheme = () => {
    if (theme.type === 'light') {
      setTheme({
        type: 'dark',
        buttonIcon: '../images/icon-sun.svg'
      });
    } else {
      setTheme({
        type: 'light',
        buttonIcon: '../images/icon-moon.svg'
      });
    }
  }

  return (
    <ThemeProvider theme={theme.type === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className="App">
        <TodoPage handleTheme={toggleTheme} currTheme={theme} />
        <div>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel='noreferrer'>Frontend Mentor</a>.
          Coded by Rachit Patel
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
