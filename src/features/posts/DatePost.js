import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const DatePost = ({ timestamp }) => {
  let timePost = '';
  if (timestamp) {
    // parseISO parse the given string in ISO 8601 format and return an instance of Date.
    // Convert string '2014-02-11T11:30:30' to date:
    // const result = parseISO('2014-02-11T11:30:30')
    //=> Tue Feb 11 2014 11:30:30
    const parseDate = parseISO(timestamp);

    // formatDistanceToNow Return the distance between the given date and now in words.
    const datePostFromNow = formatDistanceToNow(parseDate);
    timePost = datePostFromNow;
  }

  return (
    <>
      <span>
        <i>{timePost} ago</i>
      </span>
    </>
  );
};

export default DatePost;
