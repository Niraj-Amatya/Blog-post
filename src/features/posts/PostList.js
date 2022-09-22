import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';

const PostList = () => {
  // getting posts from the store
  //   selectAllPosts is a selector from the postSlice
  const posts = useSelector((state) => selectAllPosts(state));

  //   returning posts from the posts state
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      {/* preview only first 100 characters substring is used */}
      <p>{post.content.substring(0, 100)}</p>
      <p className="author">
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  ));

  return (
    <section>
      <h1>Posts</h1>
      {renderedPosts}
    </section>
  );
};

export default PostList;
