import React from "react";
import s from "./SiteCard.module.css";
import Button from "../Button/Button";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";
import {ReactComponent as BiTrash} from "../../assets/trash.svg";
import {ReactComponent as BiPencil} from "../../assets/pencil.svg";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {deleteSiteAction} from "../../store/actions/userSitesActions";
import {connect} from "react-redux";

const SiteCard = ({site, deleteSite, className, content}) => {
    const history = useHistory();
    const {logo, site_name: name, id} = site;

    const redirectToDemo = () => history.push(`/site/demo/${id}`);
    const redirectToSingle = () => history.push(`/site/${id}`);

    const onDeletePress = () => deleteSite(id);

    return (
        <CardWrapper className={`${s.container} ${className}`}>
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
                        <Button
                            title={content.public_button}
                            className={s.button}
                            size="md"
                        />
                    </div>
                    <div>
                        <Button
                            title={content.demo_button}
                            isSecondary
                            onClick={redirectToDemo}
                            className={s.button}
                            size="sm"
                        />
                    </div>
                </div>
            </div>
            <div className={s.secondary__buttons}>
                <Link to={`/edit-site/${site.id}`} className={s.secondary__button}>
                    <BiPencil/>
                </Link>
                <BiTrash onClick={onDeletePress} className={s.secondary__button}/>
            </div>
        </CardWrapper>
    );
};

const mapStateToProps = (state) => ({
    content: state.content.page_content.sites,
});

const mapDispatchToProps = (dispatch) => ({
    deleteSite: (id) => dispatch(deleteSiteAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteCard);
