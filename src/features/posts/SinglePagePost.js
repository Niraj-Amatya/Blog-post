import React from 'react';
import { selectPostByID } from './postSlice';
import { useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import DatePost from './DatePost';
import ReactionButtons from './ReactionButtons';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './singlePagePost.css';

const SinglePagePost = () => {
  // getting postId from useParams()
  const { postId } = useParams();
  // getting single post using useSelector
  // postId is passed to selectPostById
  //   postId is received from useParams() from react-router-dom

  const post = useSelector((state) => selectPostByID(state, Number(postId)));

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
    <>
      <article className="single-page-post">
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
      <h4 className="singlePage__Links">
        <Link to={`/post/edit/${post.id}`} className="singlePage__Link">
          Edit Post
        </Link>
        <Link className="singlePage__Link" to="/">
          Return Home
        </Link>
        {/* link to edit post page */}
      </h4>
    </>
  );
};

export default SinglePagePost;
