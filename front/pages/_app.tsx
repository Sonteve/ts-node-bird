import React, { ElementType } from "react";
import wrapper from "../store/configureStore";
import Head from "next/head";
import "antd/dist/antd.css";
import withReduxSaga from "next-redux-saga";

interface Props {
  Component: ElementType;
}

// page들의 공통 컴포넌트 : page컴포넌트들이 Component로 들어온후 공통 요소 적용을 받은뒤 return 된다.
const App = ({ Component }: Props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(withReduxSaga(App));
