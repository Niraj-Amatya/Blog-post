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

  // Boolean will be true if title, content or userId has value and false if they are empty/null/undefined.
  // this is used to deciede if form button shoudl be disabled or allowed to submit
  const canSubmitButton = Boolean(title) && Boolean(content) && Boolean(userId);

  // helperClass for styling of button when canSubmitButton is true or false.
  // this will be used in submit button
  const helperClass = canSubmitButton ? 'save-post__button' : 'disabled';

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
    setUserId('');
  };

  return (
    <section>
      <h2>Add New Post</h2>
      {!canSubmitButton ? <p>Please fill the form to submit your post</p> : ''}
      <form onSubmit={handleSubmit}>
        <div className="form__container">
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
            <option></option>
            {userOptions}
          </select>
          <label htmlFor="postContent">Content</label>
          <textarea
            name="postContent"
            id="postContent"
            value={content}
            onChange={handleContent}
          ></textarea>
        </div>
        <button
          className={helperClass}
          type="submit"
          disabled={!canSubmitButton}
        >
          Submit Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
