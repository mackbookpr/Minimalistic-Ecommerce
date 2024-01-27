import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Reducers/ThemeReducer';
import ProductsFilter from './Reducers/ProductsReducer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    filter:ProductsFilter
  },
});

// Export the store if needed in other files:
export default store;
