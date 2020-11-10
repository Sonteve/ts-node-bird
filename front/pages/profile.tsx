import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import Router from "next/router";
import {
  loadFollowers,
  loadFollowings,
  loadMoreFollowers,
  loadMoreFollowings,
  loadMyInfoAction,
} from "../reducers/user";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const Profile = () => {
  const dispatch = useDispatch();
  const { hasMoreFollower, hasMoreFollowing } = useSelector(
    ({ user }: RootState) => user
  );
  const [followerLimit, setFollowerLimit] = useState<number>(6);
  const [followingLimit, setFollowingLimit] = useState<number>(6);

  const onClickMoreFollower = useCallback(() => {
    dispatch(loadMoreFollowers.request(followerLimit));
    setFollowerLimit((prev) => prev + 3);
  }, [followerLimit]);
  const onClickMoreFollowing = useCallback(() => {
    dispatch(loadMoreFollowings.request(followingLimit));
    setFollowingLimit((prev) => prev + 3);
  }, [followingLimit]);

  const { me } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    if (!(me && me.id)) Router.push("/");
  }, [me, me?.id]);
  /* 
  useEffect(() => {
    dispatch(loadFollowers.request(3));
    dispatch(loadFollowings.request(3));
  }, []); */

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        {me && (
          <FollowList
            hasMoreFollowing={hasMoreFollowing}
            onClickMoreFollowing={onClickMoreFollowing}
            header="팔로잉"
            data={me.Followings}
          />
        )}
        {me && (
          <FollowList
            hasMoreFollower={hasMoreFollower}
            onClickMoreFollower={onClickMoreFollower}
            header="팔로워"
            data={me.Followers}
          />
        )}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoAction.request());
    context.store.dispatch(loadFollowers.request(3));
    context.store.dispatch(loadFollowings.request(3));
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
