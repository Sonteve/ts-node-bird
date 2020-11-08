import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { Post } from "../interface/post";
import { RootState } from "../reducers";
import { addComment } from "../reducers/post";

interface Props {
  post: Post;
}

const CommentForm = ({ post }: Props) => {
  const { me } = useSelector(({ user }: RootState) => user);
  const { addCommentDone, addCommentLoading } = useSelector(
    ({ post }: RootState) => post
  );
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log("test");
    if (!me) return;
    dispatch(
      addComment.request({
        content: commentText,
        PostId: post.id,
        UserId: me.id,
      })
    );
  }, [commentText, me]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  return (
    <Form
      onFinish={onSubmitComment}
      style={{ position: "relative", margin: 0 }}
    >
      <Input.TextArea
        placeholder="댓글을 입력하세요"
        value={commentText}
        onChange={onChangeCommentText}
        rows={4}
      />
      <Button
        type="primary"
        htmlType="submit"
        loading={addCommentLoading}
        style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
      >
        짹짹
      </Button>
    </Form>
  );
};

export default CommentForm;
