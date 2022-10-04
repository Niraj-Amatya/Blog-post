import React from 'react';
import { selectPostByID } from './postSlice';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import DatePost from './DatePost';
import ReactionButtons from './ReactionButtons';

const SinglePagePost = () => {
  // getting single post using useSelector
  // postId is passed to selectPostById
  const post = useSelector(selectPostByID(postId));

  //   If no post is found, will return the message
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  //   Else will return the post and details
  return (
    <article>
      <h2>{post.title}</h2>
      {/* preview only first 100 characters substring is used */}
      <p>{post.body}</p>
      <p className="author">
        <PostAuthor userId={post.userId} />
      </p>

      {/* pass the date of the post created from the post store */}
      <div className="date-reactions">
        <div className="date">
          <DatePost timestamp={post.date} />
        </div>
        <div className="reactions">
          <ReactionButtons post={post} />
        </div>
      </div>
    </article>
  );
};

export default SinglePagePost;
