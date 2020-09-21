import React, { useEffect, useState } from "react";
import s from "./SingleSite.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { fetchSingleSite } from "../../store/api/api";
import { useParams } from "react-router";
import Button from "../../misc/Button/Button";
import { BiPencil, BiTrash } from "react-icons/all";
import { Link } from "react-router-dom";

const SingleSite = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const { site = {}, tariff, tariffCurrent } = data;
  const { logo, site_name: name, created_at: date } = site;

  useEffect(() => {
    setLoading(true);
    fetchSingleSite(id).then((res) => {
      // console.log("data ===", res.data);
      const tempTariffs = {
        1: { price: {} },
        2: { price: {} },
        3: { price: {} },
      };
      // res.data.tariff.forEach((tariffProp) => {
      //   const { number, price, key } = tariffProp;
      //   if (key === "price") {
      //     tempTariffs[number].price.push(price);
      //     return;
      //   }
      //   tempTariffs[tariffProp.number][key] = tariffProp;
      // });
      setData(res.data);
      setLoading(false);
    });
  }, []);

  console.log("data ===", data);

  return !isLoading ? (
    <FixedWrapper className={s.container}>
      <div className={s.section}>
        <div className={s.section__inner}>
          <img
            src={`https://topfractal.com/${logo}`}
            alt="loading"
            className={s.section__img}
          />
          <div className={s.section__main}>
            <div>
              <h3 className={s.section__name}>{name}</h3>
              <span className={s.section__desc}>
                {date && new Date(date).toISOString().split("T")[0]}
              </span>
            </div>
            <div className={s.section__buttons}>
              <Button
                title="Опублікувати"
                size="sm"
                className={s.section__button}
              />
              <Button
                title="Демо"
                size="sm"
                isLink
                isSecondary
                className={s.section__button}
              />
            </div>
          </div>
          <div className={s.section__icons}>
            <Link to={`/edit-site/${id}`} className={s.section__icon}>
              <BiPencil />
            </Link>
            <BiTrash className={s.section__icon} />
          </div>
        </div>
        <div className={s.section__footer}>
          <div className={s.section__footer__item}>
            <span className={s.section__footer__title}>Домен</span>
            <p className={s.section__footer__value}>Не підключено</p>
          </div>
          <div className={s.section__footer__item}>
            <span className={s.section__footer__title}>Тариф</span>
            <p className={s.section__footer__value}>
              {tariffCurrent || "Безкоштовний"}
            </p>
          </div>
          <div className={s.section__footer__item}>
            <span className={s.section__footer__title}>Статус</span>
            <p className={s.section__footer__value}>Не опубліковано</p>
          </div>
        </div>
      </div>
      <div className={s.section} />
    </FixedWrapper>
  ) : (
    <FixedWrapper>
      <h1>Loading</h1>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSite);
