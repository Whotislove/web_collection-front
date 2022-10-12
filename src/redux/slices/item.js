import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  item: { name: 'Итем1', tags: '#zafse #adwad #adwad' },
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem(state, action) {
      state.item = action.payload;
    },
  },
});
export const { setItem } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
