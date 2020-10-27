import React from "react";
import { Input, Form } from "antd";
import styled from "styled-components";

const FormBlock = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  return (
    <FormBlock>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </FormBlock>
  );
};

export default NicknameEditForm;
