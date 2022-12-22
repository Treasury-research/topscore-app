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
import IconS2 from "./../../static/img/s2.png";
import imgRadarSmall from "./../../static/img/radar-small.png";
import { copyToClipboard } from "../../lib/tool";
import {
  TwitterOutlined,
  DownOutlined,
  CopyOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Radar from "./components/Radar";
import { Dropdown, Space, Menu, Drawer, Pagination, Modal } from "antd";

const typeList = [
  "Influence",
  "Campaign",
  "Creation",
  "Curation",
  "Collection",
  "Engagement",
];

const rankList = [
  {
    name: "Lens Protocol",
    score: "201",
  },
  {
    name: "KNN3 Network",
    score: "150",
  },
  {
    name: "Stani",
    score: "130",
  },
  {
    name: "Stani",
    score: "130",
  },
  {
    name: "Stani",
    score: "130",
  },
  {
    name: "Stani",
    score: "130",
  },
];

export default function Main() {
  const { account, connectWallet } = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [handlesList, setHandlesList] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [indicators, setIndicators] = useState<any>({});
  const [influence, setInfluence] = useState<any>({});
  const [campaign, setCampaign] = useState<any>({});
  const [creation, setCreation] = useState<any>({});
  const [curation, setCuration] = useState<any>({});
  const [collection, setCollection] = useState<any>({});
  const [engagement, setEngagement] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useState<any>({});
  const [activeTag, setActiveTag] = useState(0);
  const [activeHandleIndex, setActiveHandleIndex] = useState<number>(0);
  const [pub, setPub] = useState<any>({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rador1, setRador1] = useState([
    { name: "Influence", value: 90 },
    { name: "Campaign", value: 80 },
    { name: "Creation", value: 70 },
    { name: "Curation", value: 60 },
    { name: "Collection", value: 80 },
    { name: "Engagement", value: 90 },
  ]);

  const [rador2, setRador2] = useState([
    { name: "", value: 90 },
    { name: "", value: 80 },
    { name: "", value: 70 },
    { name: "Curation", value: 60 },
    { name: "", value: 80 },
    { name: "", value: 90 },
  ]);

  const [rador3, setRador3] = useState([
    { name: "", value: 90 },
    { name: "", value: 80 },
    { name: "", value: 70 },
    { name: "", value: 60 },
    { name: "Campaign", value: 80 },
    { name: "Engagement", value: 90 },
  ]);

  const onClose = () => {
    setShowList(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getLensHandle = async () => {
    const testAccount = "0xcde3725b25d6d9bc78cf0941cc15fd9710c764b9";
    const res: any = await api.get(`/lens/handles/${testAccount}`);
    setHandlesList(res.data);
  };

  const getIndicators = async (profileId: string) => {
    const res: any = await api.get(`/lens/indicators/${profileId}`);
    setIndicators(res.data);
  };

  const getInfluence = async (profileId: string) => {
    const res: any = await api.get(`/lens/influence/${profileId}`);
    setInfluence(res.data);
  };

  const getCampaign = async (profileId: string) => {
    const res: any = await api.get(`/lens/campaign/${profileId}`);
    setCampaign(res.data);
  };

  const getCreation = async (profileId: string) => {
    const res: any = await api.get(`/lens/creation/${profileId}`);
    setCreation(res.data);
  };

  const getCuration = async (profileId: string) => {
    const res: any = await api.get(`/lens/curation/${profileId}`);
    setCuration(res.data);
  };

  const getCollection = async (profileId: string) => {
    const res: any = await api.get(`/lens/collection/${profileId}`);
    setCollection(res.data);
  };

  const getEngagement = async (profileId: string) => {
    const res: any = await api.get(`/lens/engagement/${profileId}`);
    setEngagement(res.data);
  };

  const getPub = async (profileId: string) => {
    const res: any = await api.get(`/lens/topPub/${profileId}`);
    setPub(res.data);
  };

  const getUserInfo = async (profileId: string) => {
    const res = await Promise.all([
    getIndicators(profileId),
      getInfluence(profileId),
      getCampaign(profileId),
      getEngagement(profileId),
      getCreation(profileId),
      getCollection(profileId),
      getCuration(profileId),
    getPub(profileId)

    ]);
    console.log("aaaa", res);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getLensHandle();
  }, [account]);

  useEffect(() => {
    if (!handlesList || handlesList.length === 0) {
      return;
    }

    const profile = handlesList[activeHandleIndex];

    // const profileId = profile.profileId;

    setCurrentProfile(profile);

    // getUserInfo(profileId);
  }, [activeHandleIndex, handlesList]);

  useEffect(() => {
    const { profileId } = currentProfile;

    if (!profileId) {
      return;
    }

    getUserInfo(profileId);

  }, [currentProfile]);

  return (
    <div className="toscore">
      <div className="toscore-head">
        <div>
          <div className="topscore-head-main-btn">Profile</div>
          <div className="topscore-head-main-btn">CharacteristicDEX</div>
        </div>
        {account ? (
          <div className="topscore-head-wallet-btn">{shortenAddr(account)}</div>
        ) : (
          <div
            onClick={() => connectWallet}
            className="topscore-head-wallet-btn"
          >
            Connect
          </div>
        )}
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
                        {handlesList.map((t: any, i: number) => (
                          <div
                            className="drop-menu"
                            key={i}
                            onClick={() => setActiveHandleIndex(i)}
                          >
                            {t.handle}
                          </div>
                        ))}
                      </Menu>
                    }
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="space">
                        {currentProfile.name}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <div>@{currentProfile.profile}</div>
              </div>
            </div>
            <div
              className="topscore-head-wallet-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Share & Claim
            </div>
          </div>

          <div className="top-rador">
            <div>
              <Radar
                data={rador1}
                id="top-rador"
                width={"100%"}
                height={"100%"}
                showList={() => setShowList(true)}
              />
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
                      <p>
                        <span>2,912</span>
                        <span>Posts</span>
                      </p>
                      <p>
                        <span>3,601</span>
                        <span>Comments</span>
                      </p>
                      <p>
                        <span>910</span>
                        <span>Mirrors</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Drawer
              title=""
              placement="right"
              onClose={onClose}
              open={showList}
              closable={false}
            >
              <div className="drawer">
                <div
                  className="rightOut"
                  onClick={() => {
                    setShowList(false);
                  }}
                >
                  <RightOutlined />
                </div>
                <Dropdown
                  overlay={
                    <Menu>
                      {typeList.map((t, i) => (
                        <div className="drop-menu" key={i}>
                          {t}
                        </div>
                      ))}
                    </Menu>
                  }
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="space overall">
                      <span className="list-type">Overall</span>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                {rankList.map((t, i) => (
                  <div className="rank-item" key={i}>
                    <span>{i + 1}</span>
                    <span>k</span>
                    <span>{t.name}</span>
                    <span>
                      <img src={imgRadarSmall} alt="" />
                    </span>
                    <span>Score: {t.score}</span>
                  </div>
                ))}
                <div className="pagination">
                  <Pagination simple total={50} />
                </div>
              </div>
            </Drawer>
          </div>
          <div className="btn-group-1">
            <div>
              <div className="topscore-head-main-btn">Influence</div>
              <div className="topscore-head-main-btn">Curation</div>
            </div>
          </div>
          <div className="influence_curation">
            <div className="left-rador">
              <Radar
                data={rador2}
                id="top-rador_1"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className="right-text">
              <p>YOUR 2022 LENS-PRINT</p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
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
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
              <p>
                YOUR 2022 HAVE MIRRORED A TOTAL OF <span>_NUM_</span> OF
                CONTENT.
              </p>
            </div>
            <div className="right-rador">
              <Radar
                data={rador3}
                id="top-rador_2"
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <div className="con">
            <div className="head">
              <div>K</div>
              <div>
                <div>KNN3 Network</div>
                <div>
                  <span>@knn3network.lens</span>
                </div>
              </div>
            </div>
            <div className="msg">ewrwerwerwerwerwerewr</div>
            <div className="msg-img">
              <img src={IconS2} />
            </div>
            <div className="pro-data">
              <div>
                <span>
                  <img src={IconG1} alt="" />
                </span>
                <span>45</span>
              </div>
              <div>
                <span style={{ color: "red" }}>
                  <img src={IconG2} alt="" style={{ color: "red" }} />
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
        <div
          className="leftOut"
          onClick={() => {
            setShowList(true);
          }}
        >
          <LeftOutlined />
        </div>
      </div>
      <Modal
        className="claimModal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        <div className="claim-img"></div>
        <div className="claim-bottom">
          <div>Claim</div>
          <div>
            <div></div>
            <div>
              <TwitterOutlined />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
