import { createSlice, nanoid } from '@reduxjs/toolkit';

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
  reducers: {
    // add post reduce
    // recieve payload from the form
    postAdded(state, action) {
      const post = action.payload;
      const newPost = {
        id: nanoid(),
        title: post.title,
        content: post.content,
      };

      console.log(newPost);

      state.push(newPost);
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postSlice.actions;

export default postSlice.reducer;
