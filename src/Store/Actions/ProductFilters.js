export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch('../Data/products.json');
  const { products } = await response.json();
  dispatch({ type: FETCH_PRODUCTS, payload: products });
};

export const ProductFilters = ({ category }) => ({ type: FILTER_PRODUCTS, payload: { category } });

