import React from 'react';

import PostAuthor from './PostAuthor';
import DatePost from './DatePost';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      {/* preview only first 100 characters substring is used */}
      <p>{post.body.substring(0, 100)}</p>
      <p className="author">
        <PostAuthor userId={post.userId} />
      </p>
      <p>
        <Link to={`post/${post.id}`}>More Info</Link>
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

export default PostExcerpt;
