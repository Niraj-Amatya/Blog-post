import React from 'react';
import PostList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostList from './features/posts/PostList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
        </Route>
      </Routes>

      <AddPostForm />
      <PostList />
    </>
  );
}

export default App;
