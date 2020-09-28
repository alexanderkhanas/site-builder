import React, { useEffect, useState } from "react";
import s from "./SingleSite.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { fetchSingleSite, publishSiteRequest } from "../../store/api/api";
import { useParams } from "react-router";
import Button from "../../misc/Button/Button";
import { BiPencil, BiTrash } from "react-icons/all";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FullPageLoader from "../../misc/FullPageLoader/FullPageLoader";

const SingleSite = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState({
    index: 0,
    period: "month",
  });
  const { id } = useParams();

  const { site = {}, tariff, tariffCurrent } = data;
  const { logo, site_name: name, created_at: date, remote_url: url } = site;

  const onTariffSelect = (index) => {
    setSelectedTariff((prev) => ({ ...prev, index }));
  };

  const publishSite = async () => {
    publishSiteRequest(id).catch(() => {
      fetchSingleSite(id)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchSingleSite(id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  console.log("data ===", data);

  console.log("selected tariff ===", selectedTariff);

  return !isLoading && site.id ? (
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
              <p className={s.section__desc}>
                {date && new Date(date).toISOString().split("T")[0]}
              </p>
              {!!url && (
                <a
                  href={`http://${url}`}
                  className={s.section__url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {url}
                </a>
              )}
            </div>
            <div className={s.section__buttons}>
              <Button
                title="Опублікувати"
                size="md"
                onClick={publishSite}
                className={s.section__button}
              />
              <Button
                title="Демо"
                size="md"
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
            <p className={s.section__footer__value}>
              {url ? "Опубліковано" : "Не опубліковано"}
            </p>
          </div>
        </div>
      </div>
      <div className={s.section}>
        <Tabs selectedIndex={selectedTariff.index} onSelect={onTariffSelect}>
          <TabList className={s.tabs__container}>
            {tariff.map(({ name }) => (
              <Tab selectedClassName={s.tab__active} className={s.tab}>
                {name}
              </Tab>
            ))}
          </TabList>
          {tariff.map((tariffObj) => {
            const { id, text } = tariffObj;
            const { price } = tariffObj[selectedTariff.period];
            return (
              <TabPanel key={id}>
                <div className={s.tariff}>
                  <div className={s.tariff__main}>
                    <div className={s.tariff__price__container}>
                      <span className={s.tariff__label}>Ціна</span>
                      <p className={s.tariff__value}>{price}</p>
                    </div>
                  </div>
                  <div className={s.tariff__desc}>
                    {text.map(({ id, value }) => (
                      <p key={`text__tariff${id}`}>{value}</p>
                    ))}
                  </div>
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSite);
