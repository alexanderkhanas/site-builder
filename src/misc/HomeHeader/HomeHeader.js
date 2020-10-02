import React from "react";
import s from "./HomeHeader.module.css";

const HomeHeader = () => {
    return (
        <div className={s.container}>
            <div className={s.inner}>
                <img src={require("../../assets/home-header.png")} alt="loading" className={s.image} />
                <div className={s.main__content}>
                    <h1 className={s.title}>Streamline Your Social Media And Content Marketing</h1>
                    <p className={s.desc}>Powerful content marketing and social media management platform for publishers, brands, agencies and, startups who want to share the best content consistently and increase their reach.</p>
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;
