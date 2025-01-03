import React from "react";
import styles from "./homePage.module.css";

import { Link } from "react-router-dom";

import { cardsArr } from "../../utils/avatar/cards";

import startBtn from "./../../assets/home/start-btn.png";
import { useEffect } from "react";

export default function HomePage({ setUrl }) {
  useEffect(() => {
    setUrl("");
  }, []);
  return (
    <div className={`flex-col-center ${styles.HomePage}`}>
      <div className={`flex-col-center ${styles.avatarContainer}`}>
        {cardsArr?.map((item, idx) => (
          <div
            key={idx}
            className={`flex-row-center ${styles.singleImg} ${
              idx === 4 || idx === 5 ? styles.vertImg : styles.horiImg
            }`}
          >
            <img src={item} alt="avatar" />
          </div>
        ))}
      </div>

      <Link to={"/camera"} className="flex-row-center btnImg">
        <img src={startBtn} alt="start-btn" />
      </Link>
    </div>
  );
}
