import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// fetch post from the API using createAsyncThunk
// createAsyncThunk will accept two arguments, a string that will be used as a prefix for the generated action types and callback function that will createa a payload and should return promises
// this is generally written in async and await syntax
// axios is used to fetch data from the API

export const fetchPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

// add new post to api

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (newPost) => {
    try {
      // send newPost to fake API
      // it will incldue the complete post object with userID
      const response = await axios.post(POSTS_URL, newPost);

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// edit post
export const editPost = createAsyncThunk(
  'posts/editPost',
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        initialPost
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  console.log(typeof id);
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    // return id to extra reducer if status is 200
    if (response.status === 200) {
      return id;
    }
    // will return the statusText
    return response.statusText;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //         date: new Date().toISOString(),
    //         userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // extraReducers is a reducer that is called inisde the postSlice, however; outside the reducer, to listen to other action types
  // it takes one argument: which is a builder
  // builder is an object type.

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let min = 1;

        // const uniqueUsers = [];

        // const unique = action.payload.filter((post) => {
        //   const isDupliacte = uniqueUsers.includes(post.userId);
        //   if (!isDupliacte) {
        //     uniqueUsers.push(post);
        //     return true;
        //   }
        //   return false;
        // });

        // console.log(uniqueUsers);

        const allLoadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return post;
        });

        state.posts = state.posts.concat(allLoadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const recentPost = action.payload;
        recentPost.date = new Date().toISOString();
        recentPost.userId = Number(recentPost.userId);
        recentPost.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        state.posts.push(recentPost);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        console.log(typeof action.payload.userID);
        const updatePost = action.payload;
        updatePost.date = new Date().toISOString();
        const posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        );
        console.log(updatePost);
        state.posts = [...posts, updatePost];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(`addCase: ${action.payload}`);
        const id = action.payload;
        console.log(typeof id);
        // removing the post from the posts
        const posts = state.posts.filter((post) => post.id !== id);

        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// find the post from the store whose id matches the postId sent from the SinglePagePost.
export const selectPostByID = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
