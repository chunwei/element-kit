
import './App.css'
import ThemeBuilder from './app/dashboard/page'
import { ThemeProvider } from '@/context/ThemeContext'

function App() {
  return (
  <ThemeProvider>
    <ThemeBuilder />
  </ThemeProvider>)
}

export default App
