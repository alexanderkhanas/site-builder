import React, { useEffect, useState } from "react";
import s from "./SingleSite.module.css";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { fetchSingleSite, publishSiteRequest } from "../../store/api/api";
import { useHistory, useParams } from "react-router";
import Button from "../../misc/Button/Button";
import { BiPencil, BiTrash } from "react-icons/all";
import { Link } from "react-router-dom";
import { LiqPayPay } from "react-liqpay";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FullPageLoader from "../../misc/FullPageLoader/FullPageLoader";
import Select from "../../misc/Select/Select";
import uuid from "react-uuid";
import Checkbox from "../../misc/Checkbox/Checkbox";

const periodSelectOptions = [
  { label: "Місяць", value: "month" },
  { label: "Пів року", value: "half_year" },
  { label: "Рік", value: "year" },
];

const SingleSite = () => {
  const [data, setData] = useState({});
  const [orderId, setOrderId] = useState(uuid());
  const [isLoading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState({
    index: 0,
    period: periodSelectOptions[0],
    isInCart: false,
  });
  const { id } = useParams();
  const history = useHistory();

  const { site = {}, tariff, tariffCurrent, services } = data;
  const { logo, site_name: name, created_at: date, remote_url: url } = site;

  const onTariffSelect = (index) => {
    setSelectedTariff((prev) => ({ ...prev, index }));
  };

  const onPeriodSelect = (period) => {
    setSelectedTariff((prev) => ({ ...prev, period }));
  };

  const redirectToDemo = () => history.push(`/site/demo/${id}`);

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

  console.log("tariff ===", tariff && tariff[selectedTariff.index]);

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
                onClick={redirectToDemo}
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
      {services?.map(({ name, desk, price, id }) => (
        <div className={s.section}>
          <div className={s.service} key={`service${id}`}>
            <div className={s.service__info}>
              <h4 className={s.service__title}>{name}</h4>
              <p className={s.service__desc}>{desk}</p>
              <p className={s.section__price}>{price}₴</p>
            </div>
            <Checkbox />
          </div>
        </div>
      ))}
      <div className={s.section}>
        <Tabs selectedIndex={selectedTariff.index} onSelect={onTariffSelect}>
          <TabList className={s.tabs__container}>
            {tariff.map(({ name }) => (
              <Tab
                key={`tab${name}`}
                selectedClassName={s.tab__active}
                className={s.tab}
              >
                {name}
              </Tab>
            ))}
          </TabList>
          {tariff.map((tariffObj) => {
            const { id, text } = tariffObj;
            const { price } = tariffObj[selectedTariff.period.value];
            return (
              <TabPanel key={id}>
                <div className={s.tariff}>
                  <div className={s.tariff__main}>
                    <div className={s.tariff__desc}>
                      {text.map(({ id, value }) => (
                        <p
                          key={`text__tariff${id}`}
                          className={s.tariff__desc__item}
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={s.select__period__container}>
                    <Select
                      containerClass={s.select__period}
                      onSelect={onPeriodSelect}
                      value={selectedTariff.period.label}
                      options={periodSelectOptions}
                    />
                  </div>
                </div>

                <div className={s.tariff__price__container}>
                  <Checkbox containerClass={s.tariff__checkbox} />
                  <p className={s.section__price}>{price}₴</p>
                </div>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
      <LiqPayPay
        publicKey={process.env.REACT_APP_LIQPAY_PUBLIC}
        privateKey={process.env.REACT_APP_LIQPAY_PRIVATE}
        description="Payment for services"
        {...{ orderId }}
        result_url="http://domain.com/user/account"
        server_url="http://server.domain.com/liqpay"
        product_description="Tariffs"
        style={{ margin: "8px" }}
        extra={[
          <Button
            className={s.submit__button}
            title="Оплатити Liqpay"
            size="lg"
            key="1"
          />,
        ]}
      />
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSite);
