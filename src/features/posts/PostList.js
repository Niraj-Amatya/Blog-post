import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import DatePost from './DatePost';

const PostList = () => {
  // getting posts from the store
  //   selectAllPosts is a selector from the postSlice
  const posts = useSelector((state) => selectAllPosts(state));

  // sort the order of the post, so that the recent post is always shown on the top.

  // The localeCompare() method returns a number indicating whether a reference string comes before, or after, or is the same as the given string in sort order.
  // Returns an integer indicating whether the referenceStr comes before, after or is equivalent to the compareString.

  // Negative when the referenceStr occurs before compareString
  // Positive when the referenceStr occurs after compareString
  // Returns 0 if they are equivalent

  // sort method provides a and b to compare the date
  // slice() creates a shallow copy of the posts without mutating the actual posts array.

  const orderedPost = posts.sort((a, b) => b.date.localeCompare(a.date));
  console.log(orderedPost);

  //   returning posts from the posts state
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      {/* preview only first 100 characters substring is used */}
      <p>{post.content.substring(0, 100)}</p>
      <p className="author">
        <PostAuthor userId={post.userId} />
      </p>

      {/* pass the date of the post created from the post store */}
      <DatePost timestamp={post.date} />
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
