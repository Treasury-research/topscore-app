import React, { useState, useEffect } from "react";
import "./index.scss";
import { useParams, useHistory } from "react-router-dom";
import Wallet from "../../components/WalletBtn";
import Icon from "./../../static/img/topIcon.png";
import ImgCh1 from "./../../static/img/ch1.png";
import ImgCh2 from "./../../static/img/ch2.png";
import ImgCh3 from "./../../static/img/ch3.png";
import ImgCh4 from "./../../static/img/ch4.png";
import ImgCh5 from "./../../static/img/ch5.png";
import ImgCh6 from "./../../static/img/ch6.png";
import ImgCh1Hover from "./../../static/img/ch1-hover.png"
import ImgCh2Hover from "./../../static/img/ch2-hover.png"
import ImgCh3Hover from "./../../static/img/ch3-hover.png"
import ImgCh4Hover from "./../../static/img/ch4-hover.png"
import ImgCh5Hover from "./../../static/img/ch5-hover.png"
import ImgCh6Hover from "./../../static/img/ch6-hover.png"

export default function Character() {

  const [showArry, setShowArry] = useState([false, false, false, false, false, false]);

  const history = useHistory();

  const goProfile = () => {
    history.push(`/main`);
  };

  const setIsHover = (i: number, isHover: boolean) => {
    setShowArry((prev) => {
      prev[i] = isHover;
      return [...prev];
    });
  }

  return (
    <div className="character">
      <div className="character-head">
        <div>
          <div><img src={Icon} alt="" /></div>
          <div className="character-head-main-btn" onClick={goProfile}>Profile</div>
          <div className="character-head-main-btn">Lens-Rainbow</div>
        </div>
        <Wallet />
      </div>
      <div className="character-content">
        {/* <div className="ch-1">
          <img src={ImgCh1} alt="" />
        </div> */}
        {
          !showArry[0] &&
          <div className="ch-1" onMouseEnter={() => setIsHover(0, true)}>
            <img src={ImgCh1} alt="" />
          </div>
        }
        {
          showArry[0] &&
          <div className="ch-1" onMouseLeave={() => setIsHover(0, false)}>
            <img src={ImgCh1Hover} alt="" />
          </div>
        }

        {
          !showArry[1] &&
          <div className="ch-2" onMouseEnter={() => setIsHover(1, true)}>
            <img src={ImgCh2} alt="" />
          </div>
        }
        {
          showArry[1] &&
          <div className="ch-2" onMouseLeave={() => setIsHover(1, false)}>
            <img src={ImgCh2Hover} alt="" />
          </div>
        }

        {
          !showArry[2] &&
          <div className="ch-3" onMouseEnter={() => setIsHover(2, true)}>
            <img src={ImgCh3} alt="" />
          </div>
        }
        {
          showArry[2] &&
          <div className="ch-3" onMouseLeave={() => setIsHover(2, false)}>
            <img src={ImgCh3Hover} alt="" />
          </div>
        }

        {
          !showArry[3] &&
          <div className="ch-4" onMouseEnter={() => setIsHover(3, true)}>
            <img src={ImgCh4} alt="" />
          </div>
        }
        {
          showArry[3] &&
          <div className="ch-4" onMouseLeave={() => setIsHover(3, false)}>
            <img src={ImgCh4Hover} alt="" />
          </div>
        }

        {
          !showArry[4] &&
          <div className="ch-5" onMouseEnter={() => setIsHover(4, true)}>
            <img src={ImgCh5} alt="" />
          </div>
        }
        {
          showArry[4] &&
          <div className="ch-5" onMouseLeave={() => setIsHover(4, false)}>
            <img src={ImgCh5Hover} alt="" />
          </div>
        }

        {
          !showArry[5] &&
          <div className="ch-6" onMouseEnter={() => setIsHover(5, true)}>
            <img src={ImgCh6} alt="" />
          </div>
        }
        {
          showArry[5] &&
          <div className="ch-6" onMouseLeave={() => setIsHover(5, false)}>
            <img src={ImgCh6Hover} alt="" />
          </div>
        }
      </div>
    </div>
  );
}
