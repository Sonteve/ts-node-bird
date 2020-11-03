import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, List, Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";

import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../interface/post";
import { RootState } from "../reducers";
import PostImages from "../components/PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { removePost } from "../reducers/post";
import FollowButton from "./FollowButton";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const dispatch = useDispatch();
  const id = useSelector(({ user }: RootState) => user.me?.id);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentFormOpened, setCommentFormOpened] = useState<boolean>(false);
  const onToggleLike = useCallback(() => {
    if (!id) return;
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onClikeRemovePost = useCallback(() => {
    if (!id) return;
    dispatch(removePost.request({ id }));
  }, []);

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
                    <Button type="danger" onClick={onClikeRemovePost}>
                      삭제
                    </Button>
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
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
        <Button></Button>
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

export default PostCard;
