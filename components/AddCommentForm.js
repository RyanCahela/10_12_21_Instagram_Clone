import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { EmojiHappyIcon } from "@heroicons/react/outline";

function AddCommentForm({ postId }) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = newComment;
    setNewComment("");

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <>
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          className="border-none flex-1 focus:ring-0 outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          type="text"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          onClick={sendComment}
          className="font-semibold text-blue-400">
          Post
        </button>
      </form>
    </>
  );
}

export default AddCommentForm;
