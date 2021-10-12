import React from "react";
import Post from "./Post";

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
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          caption={post.caption}
          img={post.img}
        />
      ))}
    </div>
  );
}

export default Posts;
