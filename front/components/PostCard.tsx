import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Card, Popover, List, Comment } from "antd";
import Avatar from "antd/lib/avatar/avatar";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../interface/post";
import { RootState } from "../reducers";
import PostImages from "../components/PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {
  likePost,
  removePost,
  retweetPost,
  unLikePost,
} from "../reducers/post";
import FollowButton from "./FollowButton";
import Link from "next/link";
import moment from "moment";
moment.locale("ko");

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const dispatch = useDispatch();
  const id = useSelector(({ user }: RootState) => user.me?.id);
  const [commentFormOpened, setCommentFormOpened] = useState<boolean>(false);
  const liked = post.Likers.find((v) => v.id === id);
  const onLike = useCallback(() => {
    if (!id) return;
    console.log("좋아요 요청");
    dispatch(likePost.request({ postId: post.id }));
  }, []);
  const onUnLike = useCallback(() => {
    if (!id) return;
    console.log("좋아요 해제 요청");
    dispatch(unLikePost.request({ postId: post.id }));
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onClikeRemovePost = useCallback(() => {
    if (!id) return;
    dispatch(removePost.request({ postId: post.id }));
  }, []);

  const onClickRetweet = useCallback(() => {
    dispatch(retweetPost.request({ PostId: post.id }));
  }, []);

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onClickRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={onUnLike}
              key="heart"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      style={{ background: "pink" }}
                      onClick={onClikeRemovePost}
                    >
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
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null
        }
        extra={id && id !== post.UserId && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: "right" }}>
              {/* {moment(post.createdAt).format("YYYY-MM-DD")} */}
              {/*  from now */}
              {moment(post.createdAt, "YYYYMMDD").fromNow()}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>
              {/* {dayjs(post.createdAt).format("YYYY-MM-DD")} */}
              {moment(post.createdAt, "YYYYMMDD").fromNow()}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.UserId}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}

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
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
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
