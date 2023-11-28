export interface Category {
  id: string;
  name: string;
}

export interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface ProductListProps {
  productList: any[];
}

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
};
