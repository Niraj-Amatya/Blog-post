import React, { useState } from 'react';

const AddPostForm = () => {
  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" />
        <label htmlFor="postContent">Content</label>
        <textarea name="postContent" id="postContent"></textarea>
        <div className="save-post__button">
          <button type="button">Save Post</button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
