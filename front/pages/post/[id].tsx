import { useRouter } from "next/router";
import React from "react";
import { END } from "redux-saga";
import { loadPost } from "../../reducers/post";
import wrapper from "../../store/configureStore";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}번 게시글</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const id = context.params?.id as string;
    context.store.dispatch(loadPost.request({ PostId: parseInt(id, 10) }));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
