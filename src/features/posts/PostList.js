import React from 'react';
import { useSelector } from 'react-redux';

const PostList = () => {
  // getting posts from the store
  const posts = useSelector((state) => state.posts);

  //   returning posts from the posts state
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      {/* preview only first 100 characters substring is used */}
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
