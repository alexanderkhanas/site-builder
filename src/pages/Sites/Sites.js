import React, { useEffect, useState } from "react";
import s from "./Sites.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { getUserSitesAction } from "../../store/actions/userSitesActions";
import SiteCard from "../../misc/SiteCard/SiteCard";
import { Link } from "react-router-dom";
import FullPageLoader from "../../misc/FullPageLoader/FullPageLoader";

const Sites = ({ getSites, sites, content }) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await getSites();
      setLoading(false);
    })();
  }, []);
  return !isLoading ? (
    <FixedWrapper>
      <div className={s.cards__container}>
        {sites.length ? (
          sites.map((site) => (
            <SiteCard className={s.card} key={site.id} {...{ site }} />
          ))
        ) : (
          <div className={s.empty__container}>
            <h1>{content.no_sites}</h1>
            <div className={s.link__container}>
              <Link to="/select-template" className={s.link}>
                {content.create_button}
              </Link>
            </div>
          </div>
        )}
      </div>
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({
  sites: state.sites.all,
  content: state.content.page_content.sites,
});
const mapDispatchToProps = (dispatch) => ({
  getSites: () => dispatch(getUserSitesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
