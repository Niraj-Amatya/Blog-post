import { createSlice, nanoid } from '@reduxjs/toolkit';
// for dates in the blog post
// sub is to subtract desired date from the current date
import { sub } from 'date-fns';

// dummy data
const initialState = [
  {
    id: '1',
    title: 'Learn to code',
    content: 'Learn to code everyday.',
    // current date from new Date is subtractet by 2 hours with sub function from date-fns
    // The toISOString() method returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ
    // look for toISOString() in MDN
    // new Date() gives new date
    date: sub(new Date(), {
      hours: 2,
    }).toISOString(),
    // reactions for the post
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },

  {
    id: '2',
    title: 'Learn Redux Toolkit',
    content: 'After you learn React learn Redux Toolkit.',
    // current date from new Date is subtractet by 10 mins with sub function from date-fns
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
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

      state.push(newPost);
    },
    // reducer for reactions
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
