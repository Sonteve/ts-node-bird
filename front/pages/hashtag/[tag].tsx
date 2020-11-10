import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { END } from "redux-saga";

import axios from "axios";
import { loadHashtagPostsAction } from "../../reducers/post";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import { loadMyInfoAction } from "../../reducers/user";
import AppLayout from "../../components/AppLayout";
import { RootState } from "../../reducers";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    ({ post }: RootState) => post
  );

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostLoading) {
          dispatch(
            loadHashtagPostsAction.request({
              Hashtag: tag as string,
              lastId: mainPosts[mainPosts.length - 1]?.id,
            })
          );
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, tag, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    const tag = context.query.tag;
    context.store.dispatch(loadMyInfoAction.request());
    context.store.dispatch(
      loadHashtagPostsAction.request({
        Hashtag: tag as string,
        lastId: undefined,
      })
    );
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

export default Hashtag;
