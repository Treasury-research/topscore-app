import React, { useState, useEffect } from "react";
import "./index.scss";
import log from "../../lib/log";
import api from "../../api";
import { shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import BotText from "./../../static/img/botText.gif";
import BotLeftText from "./../../static/img/botLeftText.gif";
import imgHead from "./../../static/img/rsrv-head.png";
import radorImg from './../../static/img/radar.png'
import RadarDefaultBtn from "./../../static/img/radarDefaultBtn.gif";
import RadarHover from "./../../static/img/radarHover.gif";
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Radar from "./components/Radar";
import { Dropdown, Space, Menu, Drawer, Pagination, Modal } from "antd";

const typeList = ['???','???', '???', '???', '???', '???'];
const rankList = [{
  name: '???',
  score: '???'
},
{
  name: '???',
  score: '???'
},
{
  name: '???',
  score: '???'
},
{
  name: '???',
  score: '???'
},
{
  name: '???',
  score: '???'
},
{
  name: '???',
  score: '???'
}]
export default function Main() {
  const {account, connectWallet} = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverRadar, setIsHoverRadar] = useState(false);
  const [reserving, setReserving] = useState(false);

  const onClose = () => {
    setShowList(false);
  };

  const postReserve = async(address: string) => {
    if(reserving){
      return
    }
    try{
      setReserving(true)
      await log("reserve", address)
      setIsOpen(true);
    }catch(err){
      console.log(err);
    }finally{
      setReserving(false)
    }
  }

  const doReserve = async() => {
    if(!account){
      try{
        const connectedAddress: string = await connectWallet();
        if(connectedAddress){
          postReserve(connectedAddress);
        }
      } catch(err){
        console.log('rejected')
      }
    }else{
      postReserve(account);
    }
  }

  return (
    <div className="rsrv">
      <div className="rsrv-head">
        {account ? <div className="rsrv-head-wallet-btn">{shortenAddr(account)}</div> : 
        <div onClick={()=>connectWallet} className="rsrv-head-wallet-btn">Connect Wallet</div>}
      </div>
      <div className="des-1">2022 Wrapped</div>
      <div className="des-2">Your</div>
      <div className="des-3">on Lens</div>
      <div className="rsrv-content">
        <div className="rsrv-main">
          <div className="top-rador">
            <div>
              <Radar id="top-rador" width={"100%"} height={"100%"} showList={() => setShowList(true)} />
            </div>
            <div className="top-rador-info">
              <div className="rador-info">
                <div>
                  <div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>?</p>
                      <p>???</p>
                    </div>
                    <div className="diff-sty-info">
                      <p><span>?</span><span>???</span></p>
                      <p><span>?</span><span>???</span></p>
                      <p><span>?</span><span>???</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="appint-gif-1">
              {
                !isHoverRadar && 
                <div onMouseEnter={() => setIsHoverRadar(true)}>
                  <img src={RadarDefaultBtn} alt="" />
                </div>
              }
              {
                isHoverRadar && 
                <div onMouseLeave={() => setIsHoverRadar(false)}>
                  <img src={RadarHover} alt="" onClick={doReserve}/>
                </div>
              }
            </div>
            <Drawer title="" placement="right" onClose={onClose} open={showList} closable={false}>
              <div className="drawer">
                <div className="rightOut" onClick={() => { setShowList(false) }}><RightOutlined /></div>
                <Dropdown
                  overlay={
                    <Menu>
                      {
                        typeList.map((t, i) =>
                          <div
                            className="drop-menu"
                            key={i}
                          >
                            {t}
                          </div>
                        )
                      }
                    </Menu>
                  }
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="space overall">
                      <span className="list-type">???</span>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                {
                  rankList.map((t, i) =>
                    <div className="rank-item" key={i}>
                      <span>{i + 1}</span>
                      <span><img src={imgHead} alt="" /></span>
                      <span>{t.name}</span>
                      <span className="rank-item-radar-img"><img src={radorImg} alt="" /></span>
                      <span>Score: {t.score}</span>
                    </div>
                  )
                }
                <div className="pagination">
                  <Pagination simple total={50} disabled/>
                </div>
              </div>
            </Drawer>
            <Modal
              title=""
              open={isOpen}
              footer={null}
              onCancel={() => setIsOpen(false)}
              width={700}
              className="modal-bg"
            >
              <div className="notify-btn" onClick={() => window.open('https://sm1f0asueon.typeform.com/to/uT23cD90')}>Notify me by email</div>
            </Modal>
          </div>
        </div>
        <div className="leftOut" onClick={() => { setShowList(true) }}><LeftOutlined /></div>
        <div className="des-4">is &nbsp;almost here</div>
        <div className="des-bottom">
          <div>
          <img src={BotLeftText} alt="" />
          </div>
          <div><img src={BotText} alt="" /></div>
        </div>
      </div>
    </div>
  );
}
