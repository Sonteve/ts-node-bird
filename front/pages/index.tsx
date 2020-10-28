import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector(({ user }: RootState) => user);
  const { mainPosts } = useSelector(({ post }: RootState) => post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
