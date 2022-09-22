import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../posts/postSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '❣️',
  rocket: '🚀',
  coffee: '☕️',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  // object.entries returns an array of key, value pair from the object: [['thumbsUp','👍 '], [wow, "😲" ]] etc.
  // name is the key and emoji is the object.
  // emojis are used as a button so as it is pressed it increases in value.
  // post is recieved from the PostList component
  // postId and name/key is dispatched to the reducer
  // displayed on the front is the picture of emoji and the value which is recieved from the post.reactions and passing the key as name and it always starts from zero.

  const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="emoji-buttons"
      onClick={() =>
        dispatch(reactionAdded({ postId: post.id, reaction: name }))
      }
    >
      {emoji} {post.reactions[name]}
    </button>
  ));

  return <>{reactionButton}</>;
};

export default ReactionButtons;
