import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../types';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>({
    id: '',
    title: '',
    image: '',
    price: 0,
  });
  useEffect(() => {
    async function fetchProductDetails() {
      if (id) {
        try {
          const productDetails = await getProductById(id);
          setProduct({ ...productDetails, id, title: productDetails.name });
        } catch (error) {
          console.error('Erro ao buscar detalhes do produto.');
        }
      }
    }

    fetchProductDetails();
  }, [id]);

  // Função para adicionar o produto ao carrinho
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1 data-testid="product-detail-name">{product.title}</h1>
      <img src={ product.image } alt="" data-testid="product-detail-image" />
      <p data-testid="product-detail-price">{product.price}</p>
      <button onClick={ handleAddToCart } data-testid="product-detail-add-to-cart">
        Adicionar ao Carrinho
      </button>
      <Link to="/carrinho" data-testid="shopping-cart-button">
        Ir para o Carrinho
      </Link>
    </div>
  );
}

export default ProductDetails;
