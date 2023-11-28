import { Route, Routes } from 'react-router-dom';
import Home from './pages';
import Cart from './pages/cart';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Cart /> } />
      <Route path="/product/:id" element={ <ProductDetails /> } />
    </Routes>
  );
}

export default App;
