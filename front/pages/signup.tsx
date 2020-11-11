import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Button, Checkbox, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Password from "antd/lib/input/Password";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { signupAction } from "../reducers/user";
import Router from "next/router";

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    ({ user }: RootState) => user
  );
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState<boolean>(false);
  const [termError, setTermError] = useState<boolean>(false);
  const onChangeTerm = useCallback(
    (e: CheckboxChangeEvent) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    dispatch(
      signupAction.request({
        email,
        nickname,
        password,
      })
    );
    console.log(email, nickname, password);
  }, [email, passwordCheck, passwordCheck, term]);

  useEffect(() => {
    if (signUpError) {
      alert("이미 등록된 유저 입니다.");
    }
  }, [signUpError]);

  useEffect(() => {
    if (signUpDone) {
      Router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (me && me.id) {
      Router.push("/");
    }
  }, [me, me?.id]);
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <Input
              type="email"
              name="user-email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호확인</label>
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage style={{ color: "red" }}>
                비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              손티브의 말을 잘 들을 것을 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;

const ErrorMessage = styled.div`
  color: red;
`;
