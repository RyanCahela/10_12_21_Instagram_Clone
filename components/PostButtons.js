import React, { useState, useEffect } from "react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  HeartIcon as HeartIconEmpty,
  ChatIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline"; //Empty Heart :(
import { setDoc, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

function PostButtons({ likes, postId }) {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    return setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", postId, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", postId, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };
  return (
    <>
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="button text-red-500"
              />
            ) : (
              <HeartIconEmpty onClick={likePost} className="button" />
            )}
            <ChatIcon className="button" />
            <PaperAirplaneIcon className="button" />
          </div>
          <BookmarkIcon className="button" />
        </div>
      )}
    </>
  );
}

export default PostButtons;
