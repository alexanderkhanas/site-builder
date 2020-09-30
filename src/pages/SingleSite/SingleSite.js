import React, { useEffect, useMemo, useState } from "react";
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
import { createOrderAction } from "../../store/actions/siteActions";
import CustomTabs from "../../misc/CustomTabs/CustomTabs";

const periodSelectOptions = [
  { label: "Місяць", value: "month" },
  { label: "Пів року", value: "half_year" },
  { label: "Рік", value: "year" },
];

const SingleSite = ({ createOrder }) => {
  const [data, setData] = useState({});
  const [orderId, setOrderId] = useState(uuid());
  const [isLoading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState({
    index: 0,
    period: periodSelectOptions[0],
    isInCart: false,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [fullPrice, setFullPrice] = useState(0);
  const { id } = useParams();
  const history = useHistory();

  const { site = {}, tariff, tariffCurrent, services } = data;
  const { logo, site_name: siteName, created_at: date, remote_url: url } = site;

  const onTariffSelect = (index) => {
    setSelectedTariff((prev) => ({ ...prev, index, ...tariff[index] }));
  };

  const onPeriodSelect = (period) => {
    setSelectedTariff((prev) => ({ ...prev, period }));
  };

  const onTariffCheckboxChange = ({ target: { checked } }) => {
    setSelectedTariff((prev) => ({
      ...prev,
      isInCart: checked,
    }));
  };

  const handleSubmit = async () => {
    await createOrder(
      orderId,
      id,
      selectedTariff.id ? selectedTariff.id : null,
      selectedServices.map(({ id: serviceId }) => serviceId).join(","),
      fullPrice
    );
    setOrderId(uuid());
  };

  const onServiceCheckboxChange = ({ target: { checked } }, service) => {
    if (checked) {
      setSelectedServices((prev) => [...prev, service]);
    } else {
      setSelectedServices((prev) =>
        prev.filter((item) => item.id !== service.id)
      );
    }
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

  const { period: tariffPeriod } = selectedTariff;

  useEffect(() => {
    let temp = 0;
    console.log("selected tariff", selectedTariff);
    if (selectedTariff.isInCart) {
      temp += +selectedTariff[tariffPeriod.value].price;
    }
    selectedServices.forEach(({ price }) => {
      temp += +price;
    });
    setFullPrice(temp);
  }, [selectedTariff, selectedServices]);

  useEffect(() => {
    setLoading(true);
    fetchSingleSite(id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (tariff) {
      setSelectedTariff((prev) => ({
        ...prev,
        ...tariff[selectedTariff.index],
      }));
    }
  }, [tariff]);

  console.log("full price ===", fullPrice);

  // console.log("tariffObj ===", tariffObj);

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
              <h3 className={s.section__name}>{siteName}</h3>
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
      {services?.map((service) => {
        const { name, desk, price, id: serviceId } = service;
        return (
          <div className={s.section}>
            <div className={s.service} key={`service${serviceId}`}>
              <h4 className={s.service__title}>{name}</h4>
              <p className={s.service__desc}>{desk}</p>
              <div className={s.section__price__container}>
                <p className={s.section__price}>{price}₴</p>
                {/*<Checkbox*/}
                {/*  checked={selectedServices.includes(service)}*/}
                {/*  onChange={(e) => onServiceCheckboxChange(e, service)}*/}
                {/*  id={`service_checkbox${serviceId}`}*/}
                {/*/>*/}
                <div>
                  <Button title="Детальніше" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={s.section}>
        <CustomTabs
          tabListClass={s.tab__list}
          tabClass={s.tab}
          tabs={tariff.map(({ name }) => name)}
        >
          {tariff.map((tariffObj) => {
            const { id: tariffId, text } = tariffObj;
            const { price } = tariffObj[selectedTariff.period.value];
            return (
              <div>
                <div className={s.tariff} key={`tariff${tariffId}`}>
                  <div className={s.tariff__main}>
                    <div className={s.tariff__desc}>
                      {text.map(({ id: textId, value }) => (
                        <p
                          key={`text__tariff${textId}`}
                          className={s.tariff__desc__item}
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                  <Select
                    containerClass={s.select__period}
                    onSelect={onPeriodSelect}
                    value={selectedTariff.period.label}
                    options={periodSelectOptions}
                  />
                </div>

                <div className={s.section__price__container}>
                  <p className={s.section__price}>{price}₴</p>
                  <Checkbox
                    checked={selectedTariff.isInCart}
                    onChange={onTariffCheckboxChange}
                    containerClass={s.tariff__checkbox}
                    id={`checkbox_tariff${id}`}
                  />
                </div>
              </div>
            );
          })}
        </CustomTabs>
        {/*<Tabs selectedIndex={selectedTariff.index} onSelect={onTariffSelect}>*/}
        {/*  <TabList className={s.tabs__container}>*/}
        {/*    {tariff.map(({ name }) => (*/}
        {/*      <Tab*/}
        {/*        key={`tab${name}`}*/}
        {/*        selectedClassName={s.tab__active}*/}
        {/*        className={s.tab}*/}
        {/*      >*/}
        {/*        {name}*/}
        {/*      </Tab>*/}
        {/*    ))}*/}
        {/*  </TabList>*/}
        {/*</Tabs>*/}
      </div>
      <div className={s.cart}>
        {selectedServices.map((service) => {
          const { id: serviceId, name, desk, price } = service;
          return (
            <div className={s.cart__item} key={`cart__service${serviceId}`}>
              <div>
                <h4 className={s.cart__item__title}>{name}</h4>
                <p className={s.cart__item__desc}>{desk}</p>
              </div>
              <p className={s.cart__item__price}>{price}₴</p>
            </div>
          );
        })}
        {selectedTariff.isInCart && (
          <div className={s.cart__item} key={`cart__service${id}`}>
            <div>
              <h4 className={s.cart__item__title}>
                {tariff[selectedTariff.index].name} тариф
              </h4>
              <p className={s.cart__item__desc}>{tariffPeriod.label}</p>
            </div>
            <p className={s.cart__item__price}>
              {selectedTariff[tariffPeriod.value]?.price}₴
            </p>
          </div>
        )}
      </div>
      {!!fullPrice && (
        <LiqPayPay
          publicKey="i4340652402"
          privateKey="YH5tb7kqdw0nPSYlYDKfFlFzSGDfI5tGJADdGFK8"
          description="Payment for services"
          {...{ orderId }}
          result_url={`https://panel.topfractal.com/siteAjaxUpdate/${orderId}`}
          product_description="Tariffs"
          amount={fullPrice}
          style={{ margin: "8px" }}
          extra={[
            <Button
              onClick={handleSubmit}
              className={s.submit__button}
              title={`Оплатити Liqpay ${fullPrice}₴`}
              size="lg"
              key="1"
            />,
          ]}
        />
        // <Button
        //   onClick={handleSubmit}
        //   className={s.submit__button}
        //   title={`Оплатити Liqpay ${fullPrice}₴`}
        //   size="lg"
        //   key="1"
        // />
      )}
    </FixedWrapper>
  ) : (
    <FullPageLoader />
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  createOrder: (orderId, siteId, tariffId, serviceIds, amount) =>
    dispatch(createOrderAction(orderId, siteId, tariffId, serviceIds, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSite);
