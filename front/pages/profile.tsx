import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import Router from "next/router";
import { loadFollowers, loadFollowings } from "../reducers/user";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    if (!(me && me.id)) Router.push("/");
  }, [me, me?.id]);

  useEffect(() => {
    dispatch(loadFollowers.request());
    dispatch(loadFollowings.request());
  }, []);

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
        {me && <FollowList header="팔로잉" data={me.Followings} />}
        {me && <FollowList header="팔로워" data={me.Followers} />}
      </AppLayout>
    </>
  );
};

export default Profile;
