import React, { useEffect, useRef, useState } from "react";
import s from "./Demo.module.css";
import { useParams } from "react-router";
import { fetchSiteDemo } from "../../store/api/api";
import renderHTML from "react-render-html";
import _axios from "../../store/api/_axios";
import Iframe from "../../misc/Iframe/Iframe";

const Demo = () => {
  const { id } = useParams();
  const contentRef = useRef(null);
  const [url, setUrl] = useState("");
  const [demoElements, setDemoElements] = useState({});

  const mountNode = contentRef?.contentWindow?.document?.body;

  // useEffect(() => {
  //   if (!demoElements.skelet) return;
  //   document.getElementById(
  //     "iframe"
  //   ).contentWindow.document.innerHTML =
  // }, [demoElements]);

  useEffect(() => {
    fetchSiteDemo(id).then((res) => {
      console.log("res ===", res);
      setUrl(res.data.skelet);
    });
  }, []);

  console.log("demo element ===", demoElements);

  return <div>{!!url && <iframe className={s.iframe} src={url} />}</div>;
};

export default Demo;
