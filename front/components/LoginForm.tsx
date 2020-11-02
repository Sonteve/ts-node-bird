import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { loginAction } from "../reducers/user";
import useInput from "../hooks/useInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector(({ user }: RootState) => user);
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, setPassword] = useState<string>("");

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      console.log(email, password);
      dispatch(
        loginAction.request({
          email,
          password,
        })
      );
    },
    [email, password]
  );
  return (
    <FormBlock onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          type="email"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonBlock>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonBlock>
    </FormBlock>
  );
};

export default LoginForm;

const ButtonBlock = styled.div`
  margin-top: 10px;
`;

const FormBlock = styled(Form)`
  padding: 10px;
`;
