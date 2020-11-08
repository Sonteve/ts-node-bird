import { useRouter } from "next/router";
import React from "react";

const Hashtag = () => {
  const router = useRouter();

  return <div>{router.query.tag}</div>;
};

export default Hashtag;
