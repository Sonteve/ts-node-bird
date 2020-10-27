import React, { useCallback } from "react";
import { Button, Card, Avatar } from "antd";
interface Props {
  setIsLoggedIn: (login: boolean) => void;
}
const UserProfile = ({ setIsLoggedIn }: Props) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
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
      <Card.Meta title="Sonteve" avatar={<Avatar>SONTEVE</Avatar>} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
