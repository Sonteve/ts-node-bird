import Link from "next/link";
import React from "react";

interface Props {
  postData: string;
}
const PostCardContent = ({ postData }: Props) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, index) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
