import React, { useState, useEffect, ChangeEvent } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

interface Category {
  id: string;
  name: string;
}

function Home() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const dataCategories = await getCategories();
      if (dataCategories) {
        setCategoriesList(dataCategories);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = async () => {
    try {
      const searchData = await
      getProductsFromCategoryAndQuery(selectedCategory, searchQuery);

      if (searchData.results.length === 0) {
        setProductList([]);
      } else {
        setProductList(searchData.results);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos por texto', error);
      setProductList([]);
    }
  };

  return (
    <>
      <input
        data-testid="query-input"
        type="text"
        onChange={ handleSearchInputChange }
        value={ searchQuery }
      />
      <button
        data-testid="query-button"
        onClick={ handleSearch }
      >
        Pesquisar

      </button>
      <h2>Categorias</h2>
      <ul>
        {categoriesList.map((category: Category) => (
          <li key={ category.id }>
            <label htmlFor={ `category-${category.id}` } key={ category.id }>
              <input
                type="radio"
                id={ `category-${category.id}` }
                name="category"
                onChange={ () => handleCategoryChange(category.id) }
                checked={ selectedCategory === category.id }
                data-testid="category"
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>

      {productList.length === 0 ? (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      ) : (
        <div>
          {productList.map((product: Product) => (
            <div key={ product.id } data-testid="product">
              <img src={ product.thumbnail } alt={ product.title } />
              <h2>{product.title }</h2>
              <p>
                Preço: $
                {product.price}
              </p>
            </div>
          ))}

        </div>

      )}
    </>
  );
}

export default Home;
