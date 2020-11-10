import React, {
  ReactChild,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import useInput from "../hooks/useInput";
import Router from "next/router";

interface Props {
  children: ReactNode;
}

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }  

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const StyledSearchInput = styled(Input.Search)``;

const AppLayout = ({ children }: Props) => {
  const [searchInput, onChangeSearchInput] = useInput("");
  const { me } = useSelector(({ user }: RootState) => user);
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);
  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <StyledSearchInput
            enterButton
            style={{ verticalAlign: "middle" }}
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
      {/* xs(모바일) => sm(태블릿) => md(pc) ,  gutter : column 사이의 간격*/}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Sonteve
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
