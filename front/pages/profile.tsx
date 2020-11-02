import React, { useMemo } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Profile = () => {
  const { me } = useSelector(({ user }: RootState) => user);

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        {me && <FollowList header="팔로잉 목록" data={me.Followings} />}
        {me && <FollowList header="팔로워 목록" data={me.Followers} />}
      </AppLayout>
    </>
  );
};

export default Profile;
