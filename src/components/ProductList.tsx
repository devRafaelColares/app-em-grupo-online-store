import { Link } from 'react-router-dom';
import { ProductListProps } from '../types';

function ProductList({ productList, onAddToCart }: ProductListProps): JSX.Element {
  return (
    <div>
      {productList.map((product: any) => (
        <div key={ product.id } data-testid="product">
          <img src={ product.thumbnail } alt={ product.title } />
          <h2>{product.title}</h2>
          <p>
            Preço: $
            {product.price}
          </p>
          <button
            onClick={ () => onAddToCart(product.id) }
            data-testid="product-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
            Detalhes do Produto
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
