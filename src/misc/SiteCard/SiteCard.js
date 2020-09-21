import React from "react";
import s from "./SiteCard.module.css";
import Button from "../Button/Button";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";
import { BiPencil, BiTrash } from "react-icons/all";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { deleteSiteAction } from "../../store/actions/userSitesActions";
import { connect } from "react-redux";

const SiteCard = ({ site, deleteSite }) => {
  const history = useHistory();
  const { logo, site_name: name, id } = site;

  const redirectToDemo = () => history.push(`/site/demo/${id}`);
  const redirectToEdit = () => history.push(`/edit-site/${id}`);
  const redirectToSingle = () => history.push(`/site/${id}`);

  const onDeletePress = () => deleteSite(id);

  return (
    <CardWrapper className={s.container}>
      <img
        src={`https://topfractal.com/${logo}`}
        alt="loading"
        className={s.logo}
        onClick={redirectToSingle}
      />
      <div className={s.main__content}>
        <span className={s.title}>{name}</span>
        <div className={s.buttons}>
          <div>
            <Button title="Публікувати" className={s.button} size="sm" />
          </div>
          <Button
            title="Демо"
            isSecondary
            onClick={redirectToDemo}
            className={s.button}
            size="sm"
          />
        </div>
      </div>
      <div className={s.secondary__buttons}>
        <Link to={`/edit-site/${site.id}`} className={s.secondary__button}>
          <BiPencil />
        </Link>
        <BiTrash onClick={onDeletePress} className={s.secondary__button} />
      </div>
    </CardWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteSite: (id) => dispatch(deleteSiteAction(id)),
});

export default connect(null, mapDispatchToProps)(SiteCard);
