import { useEffect } from "react";
import { useContext } from "react";
import { contextProvider } from "../global/Context";
import Comment from "./Comments";
const Posts = () => {
  const { posts } = useContext(contextProvider);

  // console.log(posts);

  //loop q chal reha hyy
  ///Javab dyyy
  // han Yar loop to chal rha ha nechly wala code b sahi ha dekh
  // hogya solve Thanks lakin loop chal reha hyy

  return (
    <>
      {posts.map((post) => (
        <div className="posts" key={post.id}>
          <div className="posts__header">
            <div className="posts__header-avator">{post.username[0]}</div>
            <div className="posts__header-name">{post.username} </div>
          </div>
          <div className="posts__img">
            <img src={post.image} alt={post.image} />
          </div>
          <Comment id={post.id} />
        </div>
      ))}
    </>
  );
};

export default Posts;
