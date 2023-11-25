import { ProductListProps } from '../types';

function ProductList({ productList }: ProductListProps): JSX.Element {
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
        </div>
      ))}
    </div>
  );
}

export default ProductList;
