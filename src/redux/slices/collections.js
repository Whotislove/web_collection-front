import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
export const fetchCollections = createAsyncThunk('collection/fetchCollections', async () => {
  const { data } = await axios.get('/collection');
  return data;
});
export const fetchItems = createAsyncThunk('collection/fetchItems', async () => {
  const { data } = await axios.get('/item');
  return data;
});
const initialState = {
  collections: [],
  collectionsStatus: 'loading',
  itemsStatus: 'loading',
  biggest: [],
  items: [],
  tags: [],
};

const collectionsSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCollections.pending]: (state) => {
      state.collections = [];
      state.biggest = [];
      state.collectionsStatus = 'loading';
    },
    [fetchCollections.fulfilled]: (state, action) => {
      state.collections = action.payload;
      state.biggest = action.payload
        .sort((a, b) => (a.itemsCount > b.itemsCount ? -1 : 1))
        .slice(0, 5);
      state.collectionsStatus = 'loaded';
    },
    [fetchCollections.rejected]: (state) => {
      state.collections = [];
      state.biggest = [];
      state.collectionsStatus = 'error';
    },
    [fetchItems.pending]: (state) => {
      state.items = [];
      state.itemsStatus = 'loading';
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      const arr = [];
      action.payload.forEach((el) => arr.push(el.tags));
      state.tags = arr.flat().slice(0, 20);
      state.itemsStatus = 'loaded';
    },
    [fetchItems.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});
//   export const { addUserInfo, logOut } = userSlice.actions;
export const collectionsReducer = collectionsSlice.reducer;
