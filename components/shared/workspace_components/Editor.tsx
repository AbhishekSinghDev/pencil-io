"use client";

import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  editorData: string;
  setEditorData: (e: string) => void;
}

const Editor: React.FC<EditorProps> = ({ editorData, setEditorData }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={editorData}
      onChange={setEditorData}
      modules={modules}
      className="h-full w-full"
    />
  );
};

export default Editor;
