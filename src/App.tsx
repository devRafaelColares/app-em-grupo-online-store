import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages';
import Cart from './pages/cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Cart /> } />
    </Routes>
  );
}

export default App;
