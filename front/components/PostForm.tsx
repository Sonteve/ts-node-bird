import { Button, Form, Input } from "antd";
import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { RootState } from "../reducers";
import { addPost, removeImage, uploadImage } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone, addPostLoading } = useSelector(
    ({ post }: RootState) => post
  );
  const { me } = useSelector(({ user }: RootState) => user);

  const [text, onChangeText, setText] = useInput("");
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성 해 주세요.");
    }
    const formData = new FormData();
    imagePaths.forEach((imagePath) => formData.append("image", imagePath));
    formData.append("content", text);
    console.log("text", text);
    dispatch(addPost.request(formData));
  }, [text, imagePaths]);

  const onUploadImage = useCallback(
    (index) => {
      imageInput.current?.click();
    },
    [imageInput.current]
  );

  const onRemoveImage = useCallback(
    (i: number) => {
      console.log(imagePaths[i]);
      dispatch(removeImage.request({ filename: imagePaths[i] }));
    },
    [imagePaths]
  );

  const onChangeImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: FileList = e.target.files;
    const imageFormData = new FormData();
    console.log(imageFormData);
    Array.from(e.target.files).forEach((f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadImage.request(imageFormData));
    console.log(imageFormData);
  }, []);
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
        <input
          name="image"
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onUploadImage}>이미지 업로드</Button>
        <Button
          htmlType="submit"
          type="primary"
          style={{ float: "right" }}
          loading={addPostLoading}
        >
          등록
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3060/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button onClick={() => onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
