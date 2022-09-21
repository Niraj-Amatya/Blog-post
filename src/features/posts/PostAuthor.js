import React from 'react';
import { useSelector } from 'react-redux';

const PostAuthor = ({ userId }) => {
  const users = useSelector((state) => state.users);
  //   finding the author/user who has same userId as saved in the posts.
  // getting userId as porps from the PostList.
  const author = users.find((user) => user.id === userId);
  return <span> Author: {author ? author.name : 'Unknown'}</span>;
};

export default PostAuthor;
