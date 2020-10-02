import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import s from "./Home.module.css";
import TemplateCard from "../../misc/TemplateCard/TemplateCard";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import AdvantagesCard from "../../misc/AdvantagesCard/AdvantagesCard";
import { getHomeContentAction } from "../../store/actions/contentActions";
import { connect } from "react-redux";
import TariffCard from "../../misc/TariffCard/TariffCard";
import ServiceCard from "../../misc/ServiceCard/ServiceCard";
import ReviewCard from "../../misc/ReviewCard/ReviewCard";
import HomeHeader from "../../misc/HomeHeader/HomeHeader";

const Home = ({ getContent, content, lang }) => {
  const {
    page_content: { home: homeContent },
  } = content;

  const { tariffs = [], template = [], services = [] } = homeContent;

  return (
    <div className={s.container}>
      {/*<Carousel*/}
      {/*  showStatus={false}*/}
      {/*  showIndicators={false}*/}
      {/*  showThumbs={false}*/}
      {/*  infiniteLoop*/}
      {/*  useKeyboardArrows*/}
      {/*  autoPlay*/}
      {/*  emulateTouch*/}
      {/*>*/}
      {/*  {[...Array(3)].map((_, i) => (*/}
      {/*    <div className={s.carousel__img__container}>*/}
      {/*      <img*/}
      {/*        className={s.carousel__img}*/}
      {/*        src={`https://topfractal.com/images/slider${i + 1}.jpg`}*/}
      {/*        alt="loading"*/}
      {/*      />*/}
      {/*      <div className={s.carousel__content}>*/}
      {/*        <h3 className={s.carousel__title}>*/}
      {/*          {homeContent[`header_${i + 1}`]}*/}
      {/*        </h3>*/}
      {/*        <p className={s.carousel__text}>*/}
      {/*          {homeContent[`header_text_${i + 1}`]}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</Carousel>*/}
      <div className={s.section}>
        <h2 className={s.section__title}>{homeContent.templates}</h2>
        <FixedWrapper className={s.cards__container}>
          {template.map((template, i) => (
            <TemplateCard
              {...{ template }}
              key={i}
              demoText={homeContent.demo}
              selectText={homeContent.select}
            />
          ))}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{homeContent.benefits}</h2>
        <FixedWrapper className={s.cards__container}>
          {/*//BenefitsName1 BenefitsText1*/}
          {[...Array(4)].map((_, i) => (
            <AdvantagesCard
              title={homeContent[`BenefitsName${i + 1}`]}
              desc={homeContent[`BenefitsText${i + 1}`]}
              img={`https://topfractal.com/images/icon${i + 1}.png`}
            />
          ))}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{homeContent.tariffs_title}</h2>
        <FixedWrapper className={s.cards__container}>
          {[...Array(3)].map(
            (_, i) =>
              tariffs[i + 1] && (
                <TariffCard
                  isPrimary={i === 1}
                  tariff={tariffs[i + 1] || {}}
                  key={`tariff__card${i}`}
                  priceText={homeContent.priceValue}
                  selectText={homeContent.select}
                />
              )
          )}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{homeContent.services_title}</h2>
        <FixedWrapper className={s.services__container}>
          {[...Array(3)].map(
            (_, i) =>
              services[i] && (
                <ServiceCard
                  service={services[i]}
                  key={services[i]?.id}
                  selectText={homeContent.select}
                />
              )
          )}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{homeContent.reviews}</h2>
        <FixedWrapper className={s.cards__container}>
          {[...Array(3)].map((_, i) => {
            const review = {
              name: homeContent[`reviews_name_${i + 1}`],
              desc: homeContent[`reviews${i + 1}`],
            };
            return <ReviewCard {...{ review }} key={review.desc} />;
          })}
        </FixedWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.content,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
