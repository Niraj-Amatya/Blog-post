import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

// this is a dummy data, that we used to test the app.
// import { initialStateDummyData } from '../../dummyData/dummy';//

// fake base url for posts
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', // "idle" | "loading" | "succeeded" | "failed" |
  error: null,
};

// creating post slice
const postSlice = createSlice({
  name: 'posts',
  // initialState: initialStateDummyData,
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
        userId: post.userId,
        // new date is created everytime the post is created.
        // this is updated to the post store and is available store wise
        date: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      };

      state.posts.push(newPost);
    },
    // reducer for reactions
    // will recieve postId and reaction(specifice reaction name) as a dispatch action
    // destructuring method to get postId and reaction from the payload
    // checks if it is a new post or an old post in the state array
    // if new, every reactions starts with value of zero
    // else specific reaction that is dispatched by clicking that reaction button is added 1
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
