import React, { useState, useEffect } from "react";
import Post from "./Post";
import { collection, orderBy, query, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

const posts = [
  {
    id: 123,
    username: "ryanc",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "SUBSCRIBE AND DESTROY TEH LIKE BUTTON for the YT algorithm!",
  },
  {
    id: 124,
    username: "ryanc",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "SUBSCRIBE AND DESTROY TEH LIKE BUTTON for the YT algorithm!",
  },
  {
    id: 125,
    username: "ryanc",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "SUBSCRIBE AND DESTROY TEH LIKE BUTTON for the YT algorithm!",
  },
];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          caption={post.data().caption}
          img={post.data().image}
        />
      ))}
    </div>
  );
}

export default Posts;
