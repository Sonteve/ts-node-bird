import React, { useCallback } from "react";
import { Button, Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logoutAction } from "../reducers/user";
import { RootState } from "../reducers";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

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
          <br />
          {me?.Posts}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me?.Followings}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {me?.Followers}
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

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch(loadUser.request({ UserId: 1 }));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default UserProfile;
