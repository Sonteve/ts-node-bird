import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { RootState } from "../../reducers";
import { loadPost } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import Head from "next/head";
import { loadMyInfoAction } from "../../reducers/user";
import axios from "axios";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector(({ post }: RootState) => post);
  return (
    <>
      <AppLayout>
        {singlePost && (
          <>
            <Head>
              <title>{singlePost.User.nickname}님의 글</title>
              <meta name="description" content={singlePost.content} />
              <meta
                property="og:title"
                content={`${singlePost.User.nickname}님의 게시글`}
              />
              <meta property="og:description" content={singlePost.content} />
              <meta
                property="og:image"
                content={
                  singlePost.Images[0]
                    ? singlePost.Images[0].src
                    : "https://nodebird.com/favicon.ico"
                }
              />
              <meta
                property="og:url"
                content={`http://sonteve.kr/post/${id}`}
              />
            </Head>
            <PostCard post={singlePost} />
          </>
        )}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const id = context.params?.id as string;
    const PostId = Number(id);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoAction.request());
    context.store.dispatch(loadPost.request({ PostId }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    /* return { props: {} }; */
  }
);

export default Post;
