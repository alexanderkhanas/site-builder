import React from "react";
import s from "./ReviewCard.module.css";
import CardWrapper from "../../wrappers/CardWrapper/CardWrapper";
import { ReactComponent as AiOutlineLike } from "../../assets/like.svg";

const ReviewCard = ({ review }) => {
  console.log("review ===", review);
  const { desc, name } = review;
  return (
    <CardWrapper className={s.container}>
      <AiOutlineLike className={s.icon} />
      <div className={s.desc__container}>
        <p className={s.desc}>{desc}</p>
      </div>
      <div className={s.title__container}>
        <h3 className={s.title}>{name}</h3>
      </div>
    </CardWrapper>
  );
};

export default ReviewCard;
