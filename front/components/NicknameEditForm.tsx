import React, { useCallback } from "react";
import { Input, Form } from "antd";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { changeNicknameAction } from "../reducers/user";

const FormBlock = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const [nickname, onChangeNickname] = useInput("");
  const onSubmitNickname = useCallback(() => {
    dispatch(changeNicknameAction.request({ nickname }));
  }, [nickname]);
  return (
    <FormBlock>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChangeNickname}
        onSearch={onSubmitNickname}
      />
    </FormBlock>
  );
};

export default NicknameEditForm;
