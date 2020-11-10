import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import { END } from "redux-saga";
import Head from "next/head";
import { useRouter } from "next/router";

import axios from "axios";
import { loadMyInfoAction, loadUserAction } from "../../reducers/user";
import { loadUserPostsAction } from "../../reducers/post";

import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";
import { RootState } from "../../reducers";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    ({ post }: RootState) => post
  );
  const { userInfo } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1].id;
          dispatch(
            loadUserPostsAction.request({
              UserId: Number(id),
              lastId,
            })
          );
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>
          {userInfo?.nickname}
          님의 글
        </title>
        <meta name="description" content={`${userInfo?.nickname}님의 게시글`} />
        <meta
          property="og:title"
          content={`${userInfo?.nickname}님의 게시글`}
        />
        <meta
          property="og:description"
          content={`${userInfo?.nickname}님의 게시글`}
        />
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

/* export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  const id = context.params?.id as string;

  context.store.dispatch(loadMyInfoAction.request());
  context.store.dispatch(loadUserAction.request({ UserId: Number(id) }));
  context.store.dispatch(
    loadUserPostsAction.request({ UserId: Number(id), lastId: undefined })
  );
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});
 */
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    const { id } = context.query;
    context.store.dispatch(loadMyInfoAction.request());
    context.store.dispatch(loadUserAction.request({ UserId: Number(id) }));
    context.store.dispatch(
      loadUserPostsAction.request({ UserId: Number(id), lastId: undefined })
    );
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  }
);

export default User;
