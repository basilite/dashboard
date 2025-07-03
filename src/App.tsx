import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './core/router';

// TODO: add context providers
function App(){
  return <ThemeProvider><AppRouter /></ThemeProvider>;
  
}

export default App