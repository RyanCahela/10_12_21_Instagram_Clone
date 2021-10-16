import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import Caption from "./Caption";
import AddCommentForm from "./AddCommentForm";
import PostButtons from "./PostButtons";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);

  const getListOfWhoLikedThisPost = () => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return unsubscribe;
  };

  useEffect(getListOfWhoLikedThisPost, [db, id]);

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <PostHeader userImg={userImg} username={username} postId={id} />

      {/* img */}
      <img className="object-cover w-full" src={img} alt="" />

      {/* Buttons */}
      {session && <PostButtons likes={likes} postId={id} />}

      {/* caption */}
      <Caption likes={likes} username={username} caption={caption} />

      {/* comments */}
      <Comments postId={id} />

      {/* input box */}
      {session && <AddCommentForm postId={id} />}
    </div>
  );
}

export default Post;
