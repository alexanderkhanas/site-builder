import React, { useRef } from "react";
import s from "./Iframe.module.css";
import { createPortal } from "react-dom";

const Iframe = ({ children, title, ...props }) => {
  const contentRef = useRef(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  return (
    <iframe title={title} {...props} ref={contentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default Iframe;
