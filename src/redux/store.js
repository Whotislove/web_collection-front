import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { itemReducer } from './slices/item';
import { userReducer } from './slices/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collections: collectionsReducer,
    item: itemReducer,
  },
});
export default store;
