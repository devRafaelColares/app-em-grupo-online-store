import React from 'react';
import { Category, CategoryListProps } from '../types';

function CategoryList({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryListProps): JSX.Element {
  return (
    <ul>
      {categories.map((category: Category) => (
        <li key={ category.id }>
          <label htmlFor={ `category-${category.id}` } key={ category.id }>
            <input
              type="radio"
              id={ `category-${category.id}` }
              name="category"
              onChange={ () => onCategoryChange(category.id) }
              checked={ selectedCategory === category.id }
              data-testid="category"
            />
            {category.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
