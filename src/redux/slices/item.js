import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  columns: [
    { field: 'id', headerName: 'Id', width: 90 },
    { field: 'name', headerName: 'Название', width: 150 },
    { field: 'type', headerName: 'Тип', width: 120 },
    { field: 'tags', headerName: 'Тэги', width: 150 },
  ],
  rows: [
    {
      id: 1,
      name: 'Jonh',
      type: 'whiskey',
      tags: '#good #es #no',
      comments: [{ name: 'vasek', text: 'awdawdawd', date: '14.01.21 12:14' }],
    },
    {
      id: 2,
      name: 'Bal',
      type: 'whiskey',
      tags: '#good #es #no',
      comments: [{ name: 'vasek', text: 'awdawdawd', date: '12.12.14 12:14' }],
    },
    {
      id: 3,
      name: 'Royal',
      type: 'whiskey',
      tags: '#good #es #no',
      comments: [{ name: 'vasek', text: 'awdawdawd', date: '12.23.12 12:14' }],
    },
  ],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action) {
      state.rows.push({ id: state.rows.length + 1, ...action.payload });
    },
    removeItem(state, action) {
      state.rows = state.rows.filter((obj) => obj.id !== action.payload);
      state.rows.map((obj, i) => (obj.id = i + 1));
    },
    addComment(state, action) {
      state.rows[action.payload.id].comments.push({
        name: action.payload.name,
        text: action.payload.text,
        date: action.payload.date,
      });
    },
    updateItem(state, action) {
      state.rows[action.payload.id].name = action.payload.name;
      state.rows[action.payload.id].tags = action.payload.tags;
      state.rows[action.payload.id].type = action.payload.type;
    },
  },
});
export const { addItem, removeItem, addComment, updateItem } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
