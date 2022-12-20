import React, { useState, useEffect } from "react";
import "./index.scss";
import { ResponseType } from "axios";
import api from "../../api";
import BN from "bignumber.js";
import { formatIPFS, shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import IconRank from "./../../static/img/rank.png";
import LabelWarn from "./../../static/img/warn.svg";
import LabelEng from "./../../static/img/eng.svg";
import LabelCollect from "./../../static/img/collect.svg";
import IconG1 from "./../../static/img/g1.svg";
import IconG2 from "./../../static/img/g2.svg";
import IconG3 from "./../../static/img/g3.svg";
import IconG4 from "./../../static/img/g4.svg";
import IconG5 from "./../../static/img/g5.png";
import IconS2 from "./../../static/img/s2.png";
import { copyToClipboard } from "../../lib/tool";
import { TwitterOutlined, DownOutlined, CopyOutlined } from "@ant-design/icons";
import Radar from "./components/Radar";
import { Dropdown, Space, Menu } from "antd";


export default function Main() {


  return (
    <div className="toscore">
      <div className="toscore-head">
        <div>
          <div className="topscore-head-main-btn">Profile</div>
          <div className="topscore-head-main-btn">CharacteristicDEX</div>
        </div>
        <div className="topscore-head-wallet-btn">Collect</div>
      </div>
      <div className="toscore-content">
        <div className="toscore-main">
          <div>
            <div className="toscore-main-base-info">
              <div className="net-head-img">K</div>
              <div>
                <div>
                  <Dropdown
                    overlay={
                      <Menu>
                        <div
                          className="drop-menu"
                        >
                          123
                        </div>
                        <div
                          className="drop-menu"
                        >
                          456
                        </div>
                      </Menu>
                    }
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="space">
                        KNN3 Network
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <div>@knn3network.lens</div>
              </div>
            </div>
            <div className="topscore-head-wallet-btn">Share & Claim</div>
          </div>

          <div className="top-rador">
            <div>
              <Radar id="top-rador" width={"100%"} height={"100%"} />
            </div>

            <div className="top-rador-info">
              <div className="rador-info">
                <div>
                  <div>
                    <div>
                      <p>1</p>
                      <p>Rank</p>
                    </div>
                    <div>
                      <p>1,231</p>
                      <p>Score</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>620</p>
                      <p>Following</p>
                    </div>
                    <div>
                      <p>12,912</p>
                      <p>Followers</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p>32</p>
                      <p>Collections</p>
                    </div>
                    <div>
                      <p>24</p>
                      <p>Collected</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>2603</p>
                      <p>Publications</p>
                    </div>
                    <div className="diff-sty-info">
                      <p><span>2,912</span><span>Posts</span></p>
                      <p><span>3,601</span><span>Comments</span></p>
                      <p><span>910</span><span>Mirrors</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="btn-group-1">
            <div>
              <div className="topscore-head-main-btn">Influence</div>
              <div className="topscore-head-main-btn">Curation</div>
            </div>
          </div>
          <div className="influence_curation">
            <div className="left-rador">
              <Radar id="top-rador_1" width={"100%"} height={"100%"} />
            </div>
            <div className="right-text">
              <p>YOUR 2022 LENS-PRINT</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
            </div>
          </div>
          <div className="btn-group-2">
            <div>
              <div className="topscore-head-main-btn">Collection</div>
              <div className="topscore-head-main-btn">Publication</div>
            </div>
          </div>
          <div className="collect_pablication">
            <div className="left-text">
              <p>YOUR 2022 LENS-PRINT</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
              <p>YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF CONTENT.</p>
            </div>
            <div className="right-rador">
              <Radar id="top-rador_2" width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="con">
              <div className="head">
                <div>K</div>
                <div>
                  <div>
                    KNN3 Network
                  </div>
                  <div>
                    <span>@knn3network.lens</span>
                  </div>
                </div>
              </div>
              <div className="msg">
                ewrwerwerwerwerwerewr
              </div>
                <div className="msg-img">
                  <img
                    src={IconS2}
                  />
                </div>
              <div className="pro-data">
                <div>
                  <span>
                    <img src={IconG1} alt="" />
                  </span>
                  <span>45</span>
                </div>
                <div>
                  <span style={{color:'red'}}>
                    <img src={IconG2} alt="" style={{color:'red'}}/>
                  </span>
                  <span>45</span>
                </div>
                <div>
                  <span>
                    <img src={IconG3} alt="" />
                  </span>
                  <span>45</span>
                </div>
                <div>
                  <span>
                    <img src={IconG4} alt="" />
                  </span>
                  <span>45</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}