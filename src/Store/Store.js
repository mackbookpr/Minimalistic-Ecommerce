import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Reducers/ThemeReducer';
import ProductsReducer from './Reducers/ProductsReducer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    filter:ProductsReducer
  },
});

// Export the store if needed in other files:
export default store;
