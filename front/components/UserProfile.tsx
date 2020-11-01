import React, { useCallback } from "react";
import { Button, Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../reducers/user";
import { RootState } from "../reducers";

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
          짹짹
          <br />0
        </div>,
        <div key="following">
          팔로잉
          <br />0
        </div>,
        <div key="follower">
          팔로워
          <br />0
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
