import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostExcerpt from './PostExcerpt';
import { fetchPosts } from './postSlice';
import { selectAllPosts, getPostsError, getPostsStatus } from './postSlice';

const PostList = () => {
  const dispatch = useDispatch();
  // getting posts from the store
  //   selectAllPosts is a selector from the postSlice
  // getting posts, status and error with useSelector and helper functions
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // useEffect to dispatch fetchPosts from the postSlice
  // useEffect is called if postStatus is "idle"

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  // sort the order of the post, so that the recent post is always shown on the top.

  // The localeCompare() method returns a number indicating whether a reference string comes before, or after, or is the same as the given string in sort order.
  // Returns an integer indicating whether the referenceStr comes before, after or is equivalent to the compareString.

  // Negative when the referenceStr occurs before compareString
  // Positive when the referenceStr occurs after compareString
  // Returns 0 if they are equivalent

  // sort method provides a and b to compare the date
  // slice() creates a shallow copy of the posts without mutating the actual posts array.

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedList = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedList.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <section className="post-lists">{content}</section>;
};

export default PostList;
