import { FETCH_PRODUCTS, FILTER_PRODUCTS } from '../Actions/ProductFilters';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedCategory: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const { products } = action.payload;
      return { ...state, products };
    case FILTER_PRODUCTS:
      const { category } = action.payload;
      return {
        ...state,
        selectedCategory: category,
        filteredProducts: state.products.filter((product) => !category || product.category === category),
      };
    default:
      return state;
  }
};

export default productReducer;
