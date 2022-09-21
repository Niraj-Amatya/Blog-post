import React from 'react';
import { useSelector } from 'react-redux';

const PostAuthor = ({ userId }) => {
  const users = useSelector((state) => state.users);
  const author = users.find((user) => user.id === userId);
  return <span> Author: {author ? author.name : 'Unknown'}</span>;
};

export default PostAuthor;
