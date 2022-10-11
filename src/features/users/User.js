import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { selectAllPosts } from '../posts/postSlice';
import { useParams, Link } from 'react-router-dom';
import './user.css';

const User = () => {
  // getting userId from the url with useParams.
  const { userId } = useParams();

  // finding that individual user that matches the id of the user from the url
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // getting all the posts from the individual user that matches the id
  const postsByUser = useSelector((state) => {
    const allUsers = selectAllPosts(state);
    return allUsers.filter((post) => post.userId === Number(userId));
  });

  // Link to the single post page
  const allPostsByUser = postsByUser.map((post) => (
    <ul key={post.id} className="author-posts">
      <li>
        <Link className="author-posts-link" to={`/post/${post.id}`}>
          {post.title.substring(0, 20)}
        </Link>
      </li>
    </ul>
  ));

  if (!user) {
    return;
  }
  console.log(user);

  return (
    <div>
      <h2 className="author-heading">{user.name}</h2>
      <h3 className="author-blogs">Blogs</h3>
      {allPostsByUser}
    </div>
  );
};

export default User;
