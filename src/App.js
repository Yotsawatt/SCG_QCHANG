import 'antd/dist/antd.min.css';
import './App.css';
import MainPage from './page/MainPage';
import { Routes, Route } from "react-router-dom";
import MainBuyTicket from './page/MainBuyTicket';

function App() {
  return (
    <div className="App"> 
       <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/buytickets" element={<MainBuyTicket />} /> 
      </Routes>
    </div>
  );
}

export default App;
