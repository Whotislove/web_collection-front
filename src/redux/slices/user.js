import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInfo(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = {};
    },
  },
});
export const { addUserInfo, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
