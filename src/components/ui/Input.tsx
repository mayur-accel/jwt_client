"use client";

import { ChangeEvent, FC } from "react";

interface IInput {
  value?: any;
  name?: string;
  id?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = (props) => {
  return (
    <input
      className="w-full outline-0 p-2 bottom-1 bg-red-100 rounded"
      {...props}
    />
  );
};

export default Input;
