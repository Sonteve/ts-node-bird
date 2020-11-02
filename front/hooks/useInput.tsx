import React, { ChangeEvent, useCallback, useState } from "react";

export type onChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

const useInput = (
  initialValue = ""
): [
  string,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [input, setInput] = useState(initialValue);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );
  return [input, onChangeInput, setInput];
};

export default useInput;
