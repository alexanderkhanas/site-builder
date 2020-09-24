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

const Home = ({ getContent, content }) => {
  const { page_content: pageContent, tariffs, services } = content;

  return (
    <div className={s.container}>
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        emulateTouch
      >
        {[...Array(3)].map((_, i) => (
          <div className={s.carousel__img__container}>
            <img
              className={s.carousel__img}
              src={`https://topfractal.com/images/slider${i + 1}.jpg`}
              alt="loading"
            />
            <div className={s.carousel__content}>
              <h3 className={s.carousel__title}>
                {pageContent[`header_${i + 1}`]}
              </h3>
              <p className={s.carousel__text}>
                {pageContent[`header_text_${i + 1}`]}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className={s.section}>
        <h2 className={s.section__title}>{pageContent.templates}</h2>
        <FixedWrapper className={s.cards__container}>
          {[...Array(3)].map((_, i) => (
            <TemplateCard
              template={{
                name: pageContent[`templates${i + 1}`],
                img: "",
                desc: pageContent[`text_templates${i + 1}`],
                demo: "https://topfractal.com",
              }}
              key={i}
              demoText={pageContent.demo}
              selectText={pageContent.select}
            />
          ))}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{pageContent.benefits}</h2>
        <FixedWrapper className={s.cards__container}>
          {/*//BenefitsName1 BenefitsText1*/}
          {[...Array(4)].map((_, i) => (
            <AdvantagesCard
              title={pageContent[`BenefitsName${i + 1}`]}
              desc={pageContent[`BenefitsText${i + 1}`]}
              img={`https://topfractal.com/images/ben${i + 1}.png`}
            />
          ))}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{pageContent.tariffs}</h2>
        <FixedWrapper className={s.cards__container}>
          {[...Array(3)].map(
            (_, i) =>
              tariffs[i + 1] && (
                <TariffCard
                  isPrimary={i === 1}
                  tariff={tariffs[i + 1] || {}}
                  key={tariffs[i + 1]?.id}
                  priceText={pageContent.priceValue}
                  selectText={pageContent.select}
                />
              )
          )}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{pageContent.services}</h2>
        <FixedWrapper className={s.services__container}>
          {[...Array(3)].map(
            (_, i) =>
              services[i] && (
                <ServiceCard
                  service={services[i]}
                  key={services[i]?.id}
                  selectText={pageContent.select}
                />
              )
          )}
        </FixedWrapper>
      </div>
      <div className={s.section}>
        <h2 className={s.section__title}>{pageContent.reviews}</h2>
        <FixedWrapper className={s.cards__container}>
          {[...Array(3)].map((_, i) => {
            const review = {
              name: pageContent[`reviews_name_${i + 1}`],
              desc: pageContent[`reviews${i + 1}`],
            };
            return <ReviewCard {...{ review }} key={review.desc} />;
          })}
        </FixedWrapper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.content.home,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
