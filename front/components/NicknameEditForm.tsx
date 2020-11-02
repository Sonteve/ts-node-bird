import React, { useCallback, useState } from "react";
import { Input, Form } from "antd";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const FormBlock = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const [nickname, onChangeNickname] = useInput("");
  const onSubmitNickname = useCallback(() => {
    console.log("submit", nickname);
  }, []);
  return (
    <FormBlock onFinish={onSubmitNickname}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChangeNickname}
      />
    </FormBlock>
  );
};

export default NicknameEditForm;
