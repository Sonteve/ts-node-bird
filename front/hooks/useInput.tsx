import React, { ChangeEvent, useCallback, useState } from "react";

export type onChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

const useInput = (
  initialValue = ""
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] => {
  const [input, setInput] = useState(initialValue);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );
  return [input, setInput, onChangeInput];
};

export default useInput;
