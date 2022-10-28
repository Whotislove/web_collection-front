import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
export const fetchCollections = createAsyncThunk('collection/fetchCollections', async () => {
  const { data } = await axios.get('/collection');
  return data;
});
const initialState = {
  collections: [],
  status: 'loading',
  biggest: [],
};

const collectionsSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCollections.pending]: (state) => {
      state.collections = [];
      state.biggest = [];
      state.status = 'loading';
    },
    [fetchCollections.fulfilled]: (state, action) => {
      state.collections = action.payload;
      state.biggest = action.payload
        .sort((a, b) => (a.itemsCount > b.itemsCount ? -1 : 1))
        .slice(0, 3);
      state.status = 'loaded';
    },
    [fetchCollections.rejected]: (state) => {
      state.collections = [];
      state.biggest = [];
      state.status = 'error';
    },
  },
});
//   export const { addUserInfo, logOut } = userSlice.actions;
export const collectionsReducer = collectionsSlice.reducer;
