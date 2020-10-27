import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, RootState } from "../reducers";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(({ user }: RootState) => user);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      console.log(id, password);
      dispatch(
        loginAction({
          id,
          password,
        })
      );
    },
    [id, password]
  );
  return (
    <FormBlock onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
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
