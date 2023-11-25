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
