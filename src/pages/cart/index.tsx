function Cart() {
  const storedCart = localStorage.getItem('cart');
  const cartItems = storedCart ? JSON.parse(storedCart) : [];

  return (
    <div>
      {cartItems.length > 0 ? (
        <div>
          <h2>Seu Carrinho de Compras</h2>
          {cartItems.map((item: any, index: any) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity">Quantidade: 1</p>
              <p>{/* Adicione outros detalhes do produto, como preço */}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>🛒 Carrinho de compras</h1>
          <div>
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
