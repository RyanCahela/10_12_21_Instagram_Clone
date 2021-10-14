import React from "react";

function Caption({ caption, likes, username }) {
  return (
    <p className="p-5 truncate">
      {likes.length > 0 && (
        <p className="font-bold mb-1">{likes.length} likes</p>
      )}
      <span className="font-bold mr-1">{username}</span>
      {caption}
    </p>
  );
}

export default Caption;
