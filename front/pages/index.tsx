import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { media } from "../hooks/useMedia";

const Home = () => {
  /* const [currentmedia] = useMedia(); */
  const { isPc, isTablet } = media();
  console.log(isPc, isTablet);
  const { me } = useSelector(({ user }: RootState) => user);
  const { mainPosts } = useSelector(({ post }: RootState) => post);
  return (
    <AppLayout>
      <div>
        isPc : {`${isPc}`} <br /> isTablet : {`${isTablet}`}{" "}
      </div>
      {me && <PostForm />}
      {mainPosts.map((post, index) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
