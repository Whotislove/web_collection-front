import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: {},
  isAuth: false,
  theme: 'light',
  language: 'ru',
  rows: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserInfo(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logOut(state) {
      state.user = {};
      state.isAuth = false;
    },
    changeTheme(state, action) {
      state.theme = action.payload;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    setRows(state, action) {
      state.rows = [];
      action.payload.forEach((e, i) =>
        state.rows.push({
          id: i + 1,
          name: e.fullName,
          status: e.status,
          email: e.email,
          _id: e._id,
        }),
      );
    },
    onBlock(state, action) {
      state.rows[action.payload.id - 1].status = 'block';
    },
    onUnlock(state, action) {
      state.rows[action.payload.id - 1].status = 'user';
    },
    setAdmin(state, action) {
      state.rows[action.payload.id - 1].status = 'admin';
    },
    setUser(state, action) {
      state.rows[action.payload.id - 1].status = 'user';
    },
    deleteAdmin(state) {
      state.user.status = 'user';
    },
    deleteUser(state, action) {
      state.rows.splice(action.payload.id - 1, 1);
      state.rows.map((e, i) => (e.id = i + 1));
    },
  },
});
export const {
  addUserInfo,
  logOut,
  changeTheme,
  changeLanguage,
  setRows,
  onBlock,
  onUnlock,
  setAdmin,
  setUser,
  deleteAdmin,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
