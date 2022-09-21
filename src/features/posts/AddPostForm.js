import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postSlice';
import { useSelector } from 'react-redux';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  // get users from store
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  // handle title on change
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  // handle Content function
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  // state value from the selected options
  const handleSelect = (event) => {
    setUserId(event.target.value);
  };

  // on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // form will only submit if both the title and content is provided
    if (title && content) {
      dispatch(postAdded({ title, content, userId }));
    }
    // reset
    setTitle('');
    setContent('');
  };

  return (
    <section>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleTitle}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={handleSelect}
        >
          {userOptions}
        </select>
        <label htmlFor="postContent">Content</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={handleContent}
        ></textarea>
        <div className="save-post__button">
          <button type="submit">Save Post</button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
