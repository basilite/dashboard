import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './core/router';

// TODO: add context providers
export default function App(){
  return <ThemeProvider><AppRouter /></ThemeProvider>;
  
}
