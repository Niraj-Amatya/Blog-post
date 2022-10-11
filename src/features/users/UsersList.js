import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';
import './usersList.css';

const usersList = () => {
  const users = useSelector(selectAllUsers);

  //   getting all the users and mapping them provide a link for the individual user with their ID
  const allUsers = users.map((user) => (
    <li className="users-list" key={user.id}>
      <Link className="users-link" to={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2 className="user-heading">Authors</h2>
      <ul className="user-allList">{allUsers}</ul>
    </section>
  );
};

export default usersList;
