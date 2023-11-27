import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';
import { Category } from '../types';

// Componente principal da página inicial
function Home() {
  // Estado para armazenar a lista de categorias
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  // Estado para armazenar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  // Estado para armazenar a string de consulta de pesquisa
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Estado para armazenar a lista de produtos
  const [productList, setProductList] = useState<any[]>([]);

  // Efeito para carregar as categorias ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      const dataCategories = await getCategories();
      if (dataCategories) {
        setCategoriesList(dataCategories);
      }
    };

    fetchCategories();
  }, []);

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    await getProductsByCategory(categoryId);
  };

  // Função para obter os produtos de uma categoria específica
  const getProductsByCategory = async (categoryId: string) => {
    try {
      const searchData = await getProductsFromCategoryAndQuery(categoryId, '');
      setProductList(searchData.results);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria', error);
      setProductList([]);
    }
  };

  // Função para lidar com a mudança na entrada de pesquisa
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Função para lidar com a pesquisa de produtos
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

  // Estrutura JSX que renderiza a página inicial
  return (
    <div>
      <input
        type="text"
        onChange={ handleSearchInputChange }
        value={ searchQuery }
        data-testid="query-input"
      />
      <button onClick={ handleSearch } data-testid="query-button">
        Pesquisar
      </button>

      <h2>Categorias</h2>
      {/* Componente de lista de categorias */}
      <CategoryList
        categories={ categoriesList }
        selectedCategory={ selectedCategory }
        onCategoryChange={ handleCategoryChange }
      />
      {/* Condicional para renderizar mensagem ou lista de produtos */}
      {productList.length === 0 ? (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      ) : (
        <ProductList productList={ productList } />
      )}
      {/* Link para o carrinho de compras */}
      <Link to="/carrinho" data-testid="shopping-cart-button">
        Carrinho de Compras
      </Link>
    </div>
  );
}

export default Home;
