import React, { useEffect } from "react";
import s from "./Sites.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { getUserSitesAction } from "../../store/actions/userSitesActions";
import SiteCard from "../../misc/SiteCard/SiteCard";

const Sites = ({ getSites, sites }) => {
  useEffect(() => {
    getSites();
  }, []);
  return (
    <FixedWrapper>
      <div className={s.cards__container}>
        {sites.map((site) => (
          <SiteCard key={site.id} {...{ site }} />
        ))}
      </div>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({
  sites: state.sites.all,
});
const mapDispatchToProps = (dispatch) => ({
  getSites: () => dispatch(getUserSitesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
