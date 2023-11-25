import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

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
    <div>
      <input
        type="text"
        onChange={ handleSearchInputChange }
        value={ searchQuery }
        data-testid="query-input"
      />
      <button onClick={ handleSearch } data-testid="query-button">Pesquisar</button>

      <h2>Categorias</h2>
      <CategoryList
        categories={ categoriesList }
        selectedCategory={ selectedCategory }
        onCategoryChange={ handleCategoryChange }
      />
      {productList.length === 0 ? (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      ) : (
        <ProductList productList={ productList } />

      )}
      <Link to="/carrinho" data-testid="shopping-cart-button">
        Carrinho de Compras
      </Link>
    </div>
  );
}

export default Home;
