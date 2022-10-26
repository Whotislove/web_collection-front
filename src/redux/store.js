import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { userReducer } from './slices/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    collections: collectionsReducer,
  },
});
export default store;
