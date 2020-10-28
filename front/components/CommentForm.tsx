import React from "react";

interface Props {
  comments:
    | {
        User: {
          nickname: string;
        };
        content: string;
      }[]
    | null;
}

const CommentForm = ({ comments }: Props) => {
  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment.content}>{comment.content}</div>
      ))}
    </div>
  );
};

export default CommentForm;
