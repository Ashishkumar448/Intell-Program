import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';
import CalculatorAgent from './components/CalculatorAgent';
import NewsAgent from './components/NewsAgent';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/calculator" element={<CalculatorAgent />} />
        <Route path="/news" element={<NewsAgent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
