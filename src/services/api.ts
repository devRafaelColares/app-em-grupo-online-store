export async function getCategories() {
  const urlCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(urlCategories);
  const dataCategories = response.json();
  return dataCategories;
}

export async function getProductsFromCategoryAndQuery(
  categoryId: string,
  query: string,
) {
  if (categoryId) {
    const endPointId = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const responseId = await fetch(endPointId);
    const dataCategoriaId = responseId.json();
    return dataCategoriaId;
  }
  if (query) {
    const endPointQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${query}`;
    const responseQuery = await fetch(endPointQuery);
    const dataCategoriaQuery = responseQuery.json();
    return dataCategoriaQuery;
  }
  if (categoryId && query) {
    const endPointIdQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const responseIdQuery = await fetch(endPointIdQuery);
    const dataCategoriaIdQuery = responseIdQuery.json();
    return dataCategoriaIdQuery;
  }
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
