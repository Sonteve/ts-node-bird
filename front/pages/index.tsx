import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { media } from "../hooks/useMedia";
import { loadPosts } from "../reducers/post";
import { loadMyInfoAction } from "../reducers/user";

const Home = () => {
  /* const [currentmedia] = useMedia(); */
  const dispatch = useDispatch();
  const { isPc, isTablet } = media();
  console.log(isPc, isTablet);
  const { me } = useSelector(({ user }: RootState) => user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    addPostError,
  } = useSelector(({ post }: RootState) => post);
  useEffect(() => {
    dispatch(loadPosts.request({ lastId: undefined }));
    dispatch(loadMyInfoAction.request());
  }, []);

  useEffect(() => {
    if (addPostError) {
      return alert(addPostError.response?.data);
    }
  }, [addPostError]);

  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1].id;
          dispatch(loadPosts.request({ lastId }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <AppLayout>
      <div>
        isPc : {`${isPc}`} <br /> isTablet : {`${isTablet}`}{" "}
      </div>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
