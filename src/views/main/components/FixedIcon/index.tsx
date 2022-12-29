import React, { useState, useEffect } from "react";
import "./index.scss";
import IconKnn3 from "./../../../../static/img/fixIcon/KNN3.svg";
import IconLenster from "./../../../../static/img/fixIcon/lenster.svg";
import IconTwitter from "./../../../../static/img/fixIcon/Twitter.svg";
import IconDiscord from "./../../../../static/img/fixIcon/Discord.svg";
import IconHoverKnn3 from "./../../../../static/img/knn3-hover-logo.png";
import IconHoverLenster from "./../../../../static/img/lenster-hover-logo.png";
import IconHoverTwitter from "./../../../../static/img/twitter-hover-logo.png";
import IconHoverDiscord from "./../../../../static/img/discord-hover-logo.png";

const FixedIcon = (props: any) => {

    const [showIconArry, setShowIconArry] = useState([false, false, false, false]);

    const setIsHover = (i: number, isHover: boolean) => {
        setShowIconArry((prev) => {
            prev[i] = isHover;
            return [...prev];
        });
    }

    return (
        <div className="fixed-icon">
            {
                !showIconArry[0] &&
                <div onMouseEnter={() => setIsHover(0, true)}>
                    <img src={IconKnn3} alt="" />
                </div>
            }
            {
                showIconArry[0] &&
                <div onMouseLeave={() => setIsHover(0, false)} onClick={() => window.open('https://www.knn3.xyz/')}>
                    <img src={IconHoverKnn3} alt="" />
                </div>
            }

            {
                !showIconArry[1] &&
                <div onMouseEnter={() => setIsHover(1, true)}>
                    <img src={IconLenster} alt="" />
                </div>
            }
            {
                showIconArry[1] &&
                <div onMouseLeave={() => setIsHover(1, false)} onClick={() => window.open('https://lenster.xyz/u/knn3_network')}>
                    <img src={IconHoverLenster} alt="" />
                </div>
            }

            {
                !showIconArry[2] &&
                <div onMouseEnter={() => setIsHover(2, true)}>
                    <img src={IconTwitter} alt="" />
                </div>
            }
            {
                showIconArry[2] &&
                <div onMouseLeave={() => setIsHover(2, false)} onClick={() => window.open('https://twitter.com/Knn3Network')}>
                    <img src={IconHoverTwitter} alt="" />
                </div>
            }

            {
                !showIconArry[3] &&
                <div onMouseEnter={() => setIsHover(3, true)}>
                    <img src={IconDiscord} alt="" />
                </div>
            }
            {
                showIconArry[3] &&
                <div onMouseLeave={() => setIsHover(3, false)} onClick={() => window.open('http://discord.gg/UKzFVpHk4J')}>
                    <img src={IconHoverDiscord} alt="" />
                </div>
            }
        </div>
    );
};

export default FixedIcon;
