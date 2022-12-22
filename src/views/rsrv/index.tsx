import React, { useState, useEffect } from "react";
import "./index.scss";
import { ResponseType } from "axios";
import api from "../../api";
import { shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import BotText from "./../../static/img/botText.gif";
import imgRadarSmall from "./../../static/img/radar-small.png";
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

  const [isHoverRadar, setIsHoverRadar] = useState(false);

  const onClose = () => {
    setShowList(false);
  };

  return (
    <div className="rsrv">
      <div className="rsrv-head">
        {account ? <div className="rsrv-head-wallet-btn">{shortenAddr(account)}</div> : 
        <div onClick={()=>connectWallet} className="rsrv-head-wallet-btn">Connect</div>}

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
                <div onMouseEnter={() => setIsHoverRadar(true)}>2</div>
              }
              {
                isHoverRadar && 
                <div onMouseLeave={() => setIsHoverRadar(false)}>3</div>
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
                      <span>k</span>
                      <span>{t.name}</span>
                      <span><img src={imgRadarSmall} alt="" /></span>
                      <span>Score: {t.score}</span>
                    </div>
                  )
                }
                <div className="pagination">
                  <Pagination simple total={50} />
                </div>
              </div>
            </Drawer>
          </div>
        </div>
        <div className="leftOut" onClick={() => { setShowList(true) }}><LeftOutlined /></div>
        <div className="des-4">is &nbsp;almost here</div>
        <div className="des-bottom">
          <div>
            <p>Explore your</p>
            <p>TOP POSTS & STATS WITH RECAPS ON LENS</p>
          </div>
          <div><img src={BotText} alt="" /></div>
          <div>
            <p>THAT'S ALL WE CAN SAY FOR NOW...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
