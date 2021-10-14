import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
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
import Comments from "./Comments";
import Caption from "./Caption";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  // const getCommentsOnDbChange = () => {
  //   return onSnapshot(
  //     query(
  //       collection(db, "posts", id, "comments"),
  //       orderBy("timestamp", "desc")
  //     ),
  //     (snapshot) => setComments(snapshot.docs)
  //   );
  // };

  const getLikesOnDbChange = () => {};

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(() => {
    return setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = newComment;
    setNewComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          src={userImg}
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img className="object-cover w-full" src={img} alt="" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="button text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="button" />
            )}
            <ChatIcon className="button" />
            <PaperAirplaneIcon className="button" />
          </div>
          <BookmarkIcon className="button" />
        </div>
      )}
      {/* caption */}
      <Caption likes={likes} username={username} caption={caption} />

      {/* comments */}
      <Comments postId={id} />

      {/* input box */}
      {session && (
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
            disabled={!newComment.trim}
            onClick={sendComment}
            className="font-semibold text-blue-400">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
