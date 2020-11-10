import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { RootState } from "../reducers";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loadPosts } from "../reducers/post";
import { loadMyInfoAction } from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: RootState) => user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    addPostError,
  } = useSelector(({ post }: RootState) => post);

  useEffect(() => {
    if (addPostError) {
      return alert(addPostError);
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
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

// getServerSideProps 가 실행되서 변화된 액션객체를 HYDRATE로 받는다.
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    //브라우저는 자동으로 쿠키를 헤더에 넣어서 보내주지만 서버에서 쿠키를 보낼때는 직접 설정해주어야한다.
    const cookie = context.req ? context.req.headers.cookie : ""; // 서버일때만 쿠키넣어줌
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(loadPosts.request({ lastId: undefined }));
    context.store.dispatch(loadMyInfoAction.request());
    context.store.dispatch(END); // 앞의 액션들이 끝날때까지 대기
    await context.store.sagaTask.toPromise(); // configureStore에 등록한 sagaTask에 toPromise를 붙인다.
    return { props: {} };
  }
);

export default Home;
