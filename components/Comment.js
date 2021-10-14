import React from "react";
import Moment from "react-moment";

function Comment({ comment }) {
  return (
    <div key={comment.id} className="flex items-center space-x-2 mb-3">
      <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
      <p className="text-sm flex-1">
        <span className="font-bold mr-1">{comment.data().username}</span>
        <span>{comment.data().comment}</span>
      </p>
      <Moment fromNow interval={10000} className="pr-5 text-xs">
        {comment.data().timestamp?.toDate()}
      </Moment>
    </div>
  );
}

export default Comment;
