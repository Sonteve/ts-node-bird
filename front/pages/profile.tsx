import React, { useMemo } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  const followingList = useMemo(
    () => [
      { nickname: "손티브" },
      { nickname: "바보" },
      { nickname: "손현준" },
    ],
    []
  );
  const followerList = useMemo(
    () => [
      { nickname: "손티브" },
      { nickname: "바보" },
      { nickname: "손현준" },
    ],
    []
  );
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} /> */}
      </AppLayout>
    </>
  );
};

export default Profile;
