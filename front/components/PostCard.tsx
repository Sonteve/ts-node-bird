import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "../interface/post";
import { RootState } from "../reducers";
import PostImages from "../components/PostImages";
import CommentForm from "./CommentForm";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const id = useSelector(({ user }: RootState) => user.me?.id);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentFormOpened, setCommentFormOpened] = useState<boolean>(false);
  const onToggleLike = useCallback(() => setLiked((prev) => !prev), []);
  const onToggleComment = useCallback(
    () => setCommentFormOpened((prev) => !prev),
    []
  );

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={onToggleLike}
              key="heart"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && <CommentForm comments={post.Comments} />}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

export default PostCard;