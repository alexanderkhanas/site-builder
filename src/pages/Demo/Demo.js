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
      // setDemoElements(res.data);
      _axios.get(`${res.data.skelet}`).then((resolve) => {
        console.log("resolve ===", resolve);
        setDemoElements({
          content: res.data.content,
          skelet: resolve.data.split("<body>"),
        });
      });
    });
  }, []);

  console.log("demo element ===", demoElements);

  return (
    <div>
      <Iframe>
        {demoElements.skelet && (
          <div
            dangerouslySetInnerHTML={{
              __html: `${demoElements.skelet[0]}${demoElements.content.join(
                ""
              )}${demoElements.skelet[1]}`,
            }}
          />
        )}
      </Iframe>
    </div>
  );
};

export default Demo;
