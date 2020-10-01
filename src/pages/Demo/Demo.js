import React, { useEffect, useRef, useState } from "react";
import s from "./Demo.module.css";
import { useParams } from "react-router";
import { fetchSiteDemo } from "../../store/api/api";

const Demo = () => {
  const { id } = useParams();
  const contentRef = useRef(null);
  const [url, setUrl] = useState("");
  const [demoElements, setDemoElements] = useState({});

  const mountNode = contentRef?.contentWindow?.document?.body;

  useEffect(() => {
    fetchSiteDemo(id).then((res) => {
      setUrl(res.data.skelet);
    });
  }, []);

  return (
    <div>
      {!!url && <iframe title="demo id" className={s.iframe} src={url} />}
    </div>
  );
};

export default Demo;
