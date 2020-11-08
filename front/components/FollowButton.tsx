import { Button } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../interface/post";
import { FollowParam } from "../interface/user";
import { RootState } from "../reducers";
import { followAction, unfollowAction } from "../reducers/user";
interface Props {
  post: Post;
}

const FollowButton = ({ post }: Props) => {
  const [isFollowing, setIsFollowing] = useState<FollowParam | undefined>();
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    setIsFollowing(me?.Followings.find((v) => v.id === post.UserId));
  }, [me?.Followings]);

  /*   const isFollowing = useRef<FollowParam | undefined>();
  isFollowing.current = ;
 */
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(
        unfollowAction.request({
          id: post.User.id,
        })
      );
    } else {
      dispatch(followAction.request({ id: post.User.id }));
    }
  }, [isFollowing]);
  return (
    <Button onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
