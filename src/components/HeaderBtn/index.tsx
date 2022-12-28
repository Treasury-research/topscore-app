import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Icon from "./../../static/img/topIcon.png";
import useWeb3Context from "../../hooks/useWeb3Context";


const HeaderBtn = (props: any) => {
    
    const { account, connectWallet } = useWeb3Context();

    const history = useHistory();

    const goProfile = () => {
        history.push(`/user/${account}`);
    };

    const goRainBow = () => {
        history.push(`/rainbow`);
    };

    return (
        <div>
            <div><img src={Icon} alt="" /></div>
            {account && (
                <div className="topscore-head-main-btn" onClick={goProfile}>
                    Profile
                </div>
            )}
            <div className="topscore-head-main-btn" onClick={goRainBow}>Lens-Rainbow</div>
        </div>
    );
};

export default HeaderBtn;
