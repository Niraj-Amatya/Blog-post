import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostByID, editPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const EditPost = () => {
  // extract id from urls with useParams
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  get post by id that matches the id from the useParam
  const post = useSelector((state) => selectPostByID(state, Number(postId)));

  //   get all the users
  const users = useSelector(selectAllUsers);

  //   if no post return the message
  // giving error if useState is defined before this is checked
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  //   object destructuring from the single Post
  const { title, body, userId, reactions, id } = post;

  //   setting current state to title, body and userID
  const [titleDetail, setTitleDetail] = useState(title ? title : undefined);
  const [content, setContent] = useState(body ? body : undefined);
  const [userID, setUserID] = useState(userId ? userId : undefined);
  const [requestStatus, setRequestStatus] = useState('idle');

  const [submitted, setSubmitted] = useState(false);

  // handlers for the form inputs
  const titleHandler = (event) => {
    setTitleDetail(event.target.value);
  };

  const contentHandler = (event) => setContent(event.target.value);
  const userHandler = (event) => setUserID(event.target.value);

  // checking if all the fields in the form has value before submitting, so checking if canSubmit is true or false

  const canSubmit =
    [titleDetail, content, userID].every(Boolean) && requestStatus === 'idle';

  //   submit form
  const submitHandler = (event) => {
    event.preventDefault();
    try {
      // if canSubmit is true
      if (canSubmit) {
        setSubmitted(true);
        setRequestStatus('pending');
        // dispatch editPost thunk from the component
        // The promise returned by the dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error or, if available, payload created by rejectWithValue from a rejected action:
        dispatch(
          editPost({
            id,
            title: titleDetail,
            body: content,
            userId: Number(userID),
            reactions,
          })
        ).unwrap();
        // set state to empty again
        setTitleDetail('');
        setContent('');
        userID('');
      }
    } catch (error) {
      return error.message;
    } finally {
      // after performing one of above blocks
      // setTime out is used to change submitted to false so that submit success message dissapears
      //   and then navigates to homepage
      setRequestStatus('idle');
      setTimeout(() => {
        setSubmitted(false);
        navigate('/');
      }, 1000);
    }
  };

  //   to show all the user options in the select option
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  //   styling button with helper class
  // checks if canSubmit is true or false
  const helperClass = canSubmit ? 'save-post__button' : 'disabled';

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className="form__container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={titleDetail}
            onChange={titleHandler}
          />
          <label htmlFor="author">Please Select the author</label>
          <select
            name="author"
            id="author"
            // shows the original author of the post with defaultValue
            defaultValue={userID}
            onChange={userHandler}
          >
            <option></option>
            {userOptions}
          </select>
          <label htmlFor="content">Content</label>
          <textarea
            style={{ padding: '1rem' }}
            id="content"
            name="content"
            rows="10"
            column="25"
            value={content}
            onChange={contentHandler}
          />
          <button disabled={!canSubmit} className={helperClass}>
            Submit
          </button>
        </div>
      </form>
      {submitted && 'Your form is submitted'}
    </section>
  );
};

export default EditPost;
