import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {message} from 'antd'
import Icon from "./../../static/img/topIcon.png";
import useWeb3Context from "../../hooks/useWeb3Context";
import api from "../../api";

const HeaderBtn = (props: any) => {
  const [handlesList, setHandlesList] = useState<any>([]);
  const [isSelf, setIsSelf] = useState<boolean>(false);
  const { account } = useWeb3Context();

  const history = useHistory();
  const params: any = useParams();
  const { address } = params;

  const goProfile = () => {
    if (handlesList.length > 0) {
      history.push(`/user/${account}`);
    } else {
      message.info("You must have a Lens Protocol Profile");
      history.push(`/user/0x09c85610154a276a71eb8a887e73c16072029b20`);
    }
  };

  const goRainBow = () => {
    history.push(`/rainbow`);
  };

  const gotoMain = () => {
    if(history.location.pathname === '/rainbow'){
      history.goBack()
    }
  };

  const getLensHandle = async () => {
    const res: any = await api.get(`/lens/handles/${account}`);
    setHandlesList(res.data);
  };

  const goMine = () => {
    history.push(`/user/${account}`);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getLensHandle();
  }, [account]);

  useEffect(() => {
    if (!address || !account) {
      return;
    }

    setIsSelf(address === account);
  }, [address, account]);

  return (
    <div>
      <div>
        <img src={Icon} alt="" onClick={() => gotoMain()}/>
      </div>
      {account && (
        <>
        <div className="topscore-head-main-btn" onClick={goProfile}>
          Profile
        </div>
        {isSelf && props.type === 'main' ? (
          <>
            {props.profileId && (
              <div
                className="topscore-head-wallet-btn downLoadBtn"
                onClick={() => {
                  props.setDownloadModalVisible();
                }}
              >
                Download & Share
              </div>
            )}
          </>
        ) : props.type === 'main' && (
          <>
            <div
              onClick={goMine}
              className="topscore-head-wallet-btn downLoadBtn"
            >
              Check Mine
            </div>
          </>
        )}
        </>
      )}
      <div className="topscore-head-main-btn" onClick={goRainBow}>
        Lens-Rainbow
      </div>
    </div>
  );
};

export default HeaderBtn;
