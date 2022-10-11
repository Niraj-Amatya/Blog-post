import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="Header">
      <NavLink to="/" className="logo">
        <h1 className="logo-heading">Blogs</h1>
      </NavLink>

      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post"
              className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            >
              Post
            </NavLink>
          </li>
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          >
            User
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
