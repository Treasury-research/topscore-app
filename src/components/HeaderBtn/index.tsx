import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Icon from "./../../static/img/topIcon.png";
import useWeb3Context from "../../hooks/useWeb3Context";
import api from "../../api";

const HeaderBtn = (props: any) => {
  const [handlesList, setHandlesList] = useState<any>([]);

  const { account, connectWallet } = useWeb3Context();

  const history = useHistory();

  const goProfile = () => {
    if (handlesList.length > 0) {
      history.push(`/user/${account}`);
    } else {
      history.push(`/user/0x09c85610154a276a71eb8a887e73c16072029b20`);
    }
  };

  const goRainBow = () => {
    history.push(`/rainbow`);
  };

  const getLensHandle = async () => {
    const res: any = await api.get(`/lens/handles/${account}`);
    setHandlesList(res.data);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getLensHandle();
  }, [account]);

  return (
    <div>
      <div>
        <img src={Icon} alt="" />
      </div>
      {account && (
        <div className="topscore-head-main-btn" onClick={goProfile}>
          Profile
        </div>
      )}
      <div className="topscore-head-main-btn" onClick={goRainBow}>
        Lens-Rainbow
      </div>
    </div>
  );
};

export default HeaderBtn;
