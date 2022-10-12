import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  collections: [
    {
      title: 'hrusha',
      description: 'крутая свинюха на забив пойдет',
      image:
        'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
    },
    {
      title: 'sobaka',
      description: 'eto pes ochen kruyoi imya garik',
      image: 'https://mobimg.b-cdn.net/v3/fetch/0e/0e26b1b65946ee36fac9605ae67e4ac8.jpeg',
    },
    {
      title: 'kot',
      description: 'afSKNgosjrgnpoadrngpoerngpoerngporstngpisrn',
      image: 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
    },
    {
      title: 'hrusha',
      description: 'крутая свинюха на забив пойдет',
      image:
        'https://st.depositphotos.com/1039721/2414/i/600/depositphotos_24143701-stock-photo-pig-farm.jpg',
    },
    {
      title: 'sobaka',
      description: 'eto pes ochen kruyoi imya garik',
      image: 'https://mobimg.b-cdn.net/v3/fetch/0e/0e26b1b65946ee36fac9605ae67e4ac8.jpeg',
    },
    {
      title: 'kot',
      description: 'afSKNgosjrgnpoadrngpoerngpoerngporstngpisrn',
      image: 'https://s13.stc.yc.kpcdn.net/share/i/instagram/B44solahwlo/wr-1280.webp',
    },
  ],
};

const collectionsSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
});
//   export const { addUserInfo, logOut } = userSlice.actions;
export const collectionsReducer = collectionsSlice.reducer;
