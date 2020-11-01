import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import { Post } from "../interface/post";

interface Props {
  post: Post;
}

const CommentForm = ({ post }: Props) => {
  const [commentText, setCommentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {}, []);
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
        style={{ position: "absolute", right: 0, bottom: -40 }}
      >
        짹짹
      </Button>
    </Form>
  );
};

export default CommentForm;
