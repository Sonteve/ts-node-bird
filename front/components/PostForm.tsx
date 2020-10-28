import { Button, Form, Input } from "antd";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { RootState } from "../reducers";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector(({ post }: RootState) => post);
  const [text, setText, onChangeText] = useInput("");
  const imageInput = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback(() => {
    dispatch(addPost());
    setText("");
  }, []);

  const onUploadImage = useCallback(() => {
    imageInput.current?.click();
  }, [imageInput.current]);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onUploadImage}>이미지 업로드</Button>
        <Button htmlType="submit" type="primary" style={{ float: "right" }}>
          등록
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;