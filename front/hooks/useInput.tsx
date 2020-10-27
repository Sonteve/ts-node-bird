import React, { ChangeEvent, useCallback, useState } from "react";

export type onChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

const useInput = (
  initialValue = ""
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: ChangeEvent<HTMLInputElement>) => void
] => {
  const [input, setInput] = useState(initialValue);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  return [input, setInput, onChangeInput];
};

export default useInput;
