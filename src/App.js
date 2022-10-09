import React from 'react';
import PostList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePagePost from './features/posts/SinglePagePost';
import EditPost from './features/posts/EditPost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="/post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePagePost />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
