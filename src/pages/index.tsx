import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

interface Category {
  id: string;
  name: string;
}

function Home() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    const searchData = await
    getProductsFromCategoryAndQuery(selectedCategory, searchQuery);
    if (searchData) {
      console.log('Resultado da pesquisa:', searchData);
    }
  };

  return (
    <div>
      <input type="text" onChange={ handleSearchInputChange } value={ searchQuery } />
      <button onClick={ handleSearch }>Pesquisar</button>

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

      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Link to="/carrinho" data-testid="shopping-cart-button">
        Carrinho de Compras
      </Link>
    </div>
  );
}

export default Home;
