"use client";

import { ChangeEventHandler, FC } from "react";

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea: FC<TextAreaProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <textarea
      id="message"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className="text-sm w-full pl-4 pr-4 py-2 focus:outline-none focus:ring-2 bg-white hover:bg-gray-50 text-gray-500 border-gray-300 focus:ring-blue-200 rounded-md border shadow-sm"
    ></textarea>
  );
};
