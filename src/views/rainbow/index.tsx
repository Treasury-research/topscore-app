import React, { useState, useEffect } from "react";
import "./index.scss";
import { useParams, useHistory } from "react-router-dom";
import Wallet from "../../components/WalletBtn";
import ImgCh1 from "./../../static/img/dark-rainbow/ch1.png";
import ImgCh2 from "./../../static/img/dark-rainbow/ch2.png";
import ImgCh3 from "./../../static/img/dark-rainbow/ch3.png";
import ImgCh4 from "./../../static/img/dark-rainbow/ch4.png";
import ImgCh5 from "./../../static/img/dark-rainbow/ch5.png";
import ImgCh6 from "./../../static/img/dark-rainbow/ch6.png";
import ImgCh1Hover from "./../../static/img/dark-hover-rainbow/ch1-hover.png"
import ImgCh2Hover from "./../../static/img/dark-hover-rainbow/ch2-hover.png"
import ImgCh3Hover from "./../../static/img/dark-hover-rainbow/ch3-hover.png"
import ImgCh4Hover from "./../../static/img/dark-hover-rainbow/ch4-hover.png"
import ImgCh5Hover from "./../../static/img/dark-hover-rainbow/ch5-hover.png"
import ImgCh6Hover from "./../../static/img/dark-hover-rainbow/ch6-hover.png"
import HeaderBtn from "../../components/HeaderBtn";

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
        <HeaderBtn />
        <Wallet />
      </div>
      <div className="character-content-scroll">
      <div className="character-content">
        <div className="character-content-left">
          <div>
            <p>Make a lasting impact on social media</p>
            <p>with TopScore! Our myColor personality color test</p>
            <p>and annual social reports</p>
            <p>help you understand your online presence</p>
            <p>and make the most of it.</p>
            <p>Join us and harness the power of social media.</p>
          </div>
          <div>
            <p>Understand yourself</p>
            <p>and your friends better with </p>
            <p>TopScore's myColor personality color test and Lens rainbow! </p>
            <p>Our unique system presents social behavior and feedback </p>
            <p>in 21 different colors, each corresponding to a </p>
            <p>different social dimension.</p>
            <p>Generate your own Lens rainbow NFTs.</p>
          </div>
          <div>
            <p className="title">YOUR 2022 WRAPPED ON LENS</p>
            <p>Connect Wallet——Log in with your <span>Lens handle</span></p>
            <p>and get an overview of 2022 Lens footprint.</p>
          </div>
          <div>
            <p className="title">LENS RAINBOW NFT</p>
            <p>You can share your 2022 Lens footprint and rainbow</p>
            <p>color personality to Lenster and Twitter here, and</p>
            <p>you could even mint your unique Lens rainbow NFT,</p>
            <p>created on your Lens footprint.</p>
          </div>
        </div>
        <div className="character-content-right">
          <div className="right-des">
            <p>MORE</p>
            <p>COMING…</p>
          </div>
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
      </div>
    </div>
  );
}
