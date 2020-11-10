import React, { useCallback } from "react";
import { Button, Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../reducers/user";
import { RootState } from "../reducers";
import Link from "next/link";

const UserProfile = () => {
  const { me, logOutLoading } = useSelector(({ user }: RootState) => user);

  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction.request());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me?.id}`}>
            <a>
              짹짹
              <br />
              {me?.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="following">
          <Link href={`/profile`}>
            <a>
              팔로잉
              <br />
              {me?.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="follower">
          <Link href={`/profile`}>
            <a>
              팔로워
              <br />
              {me?.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        title={me?.nickname}
        avatar={<Avatar>{me?.nickname[0]}</Avatar>}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
