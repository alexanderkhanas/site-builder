import React from "react";
import s from "./FullPageLoader.module.css";
import Loader from "react-loader-spinner";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";

const FullPageLoader = () => {
  return (
    <FixedWrapper className={s.loader__container}>
      <Loader type="Oval" color="#404040" height={100} width={100} />
    </FixedWrapper>
  );
};

export default FullPageLoader;
