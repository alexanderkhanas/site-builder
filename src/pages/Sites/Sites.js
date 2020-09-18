import React, { useEffect } from "react";
import s from "./Sites.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { getUserSitesAction } from "../../store/actions/userSitesActions";

const Sites = ({ getSites }) => {
  useEffect(() => {
    getSites();
  }, []);
  return (
    <FixedWrapper>
      <div />
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  getSites: () => dispatch(getUserSitesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
