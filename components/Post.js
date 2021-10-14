import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import Caption from "./Caption";
import AddCommentForm from "./AddCommentForm";
import PostButtons from "./PostButtons";

function Post({ id, username, userImg, img, caption }) {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <PostHeader userImg={userImg} username={username} />

      {/* img */}
      <img className="object-cover w-full" src={img} alt="" />

      {/* Buttons */}
      <PostButtons likes={likes} postId={id} />

      {/* caption */}
      <Caption likes={likes} username={username} caption={caption} />

      {/* comments */}
      <Comments postId={id} />

      {/* input box */}
      <AddCommentForm postId={id} />
    </div>
  );
}

export default Post;
