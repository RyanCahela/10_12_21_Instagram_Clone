import React, { useState, useEffect } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Comment from "./Comment";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  const getCommentsOnDbChange = () => {
    return onSnapshot(
      query(
        collection(db, "posts", postId, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  };

  useEffect(getCommentsOnDbChange, [postId, db]);

  return (
    <>
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
}

export default Comments;
