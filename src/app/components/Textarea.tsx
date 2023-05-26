"use client";

import { ChangeEventHandler, forwardRef } from "react";

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

type Ref = HTMLTextAreaElement;

const TextArea = forwardRef<Ref, TextAreaProps>(
  ({ placeholder, value, onChange, rows = 4, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="text-sm w-full h-full pl-4 pr-4 py-2 focus:outline-none focus:ring-2 bg-white hover:bg-gray-50 text-gray-500 border-gray-300 focus:ring-blue-200 rounded-md border shadow-sm"
    />
  )
);

TextArea.displayName = "TextArea";

export default TextArea;
