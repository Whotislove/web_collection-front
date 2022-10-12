import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { itemReducer } from './slices/item';

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    item: itemReducer,
  },
});
export default store;
