import { createSlice } from '@reduxjs/toolkit';

// dummy data
const initialState = [
  {
    id: '1',
    title: 'Learn to code',
    content: 'Learn to code everyday.',
  },
  {
    id: '2',
    title: 'Learn Redux Toolkit',
    content: 'After you learn React learn Redux Toolkit.',
  },
];
// creating post slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const selectAllPosts = (state) => state.posts;

export default postSlice.reducer;
