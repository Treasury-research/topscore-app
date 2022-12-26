import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "./index.scss";
import { useParams, useHistory } from "react-router-dom";
import { ResponseType } from "axios";
import api from "../../api";
import BN from "bignumber.js";
import { formatIPFS, shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import Wallet from "../../components/WalletBtn";
import {
  TwitterOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Menu, Modal, Drawer, Pagination } from "antd";
import Radar from "./components/Radar";
import Comment from "./components/comment";
import IconG5 from "./../../static/img/g5.svg";
import imgRadarSmall from "./../../static/img/radar-small.png";
import S2 from "./../../static/img/s2.png";

const tag1 = ["Influence", "Curation"];

const tag2 = ["Collection", "Publication"];

const defaultPageLimit = 6;

const typeList = [
  "Overall",
  "Influence",
  "Campaign",
  "Creation",
  "Curation",
  "Collection",
  "Engagement",
];

export default function Main() {
  const { account, connectWallet } = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [handlesList, setHandlesList] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [rankList, setRankList] = useState<[]>([]);
  const [rankTotal, setRankTotal] = useState<number>(0);
  const [rankPageNo, setRankPageNo] = useState<number>(1);
  const [rankType, setRankType] = useState<string>("influence");
  const [rankLoading, setRankLoading] = useState<boolean>(false);
  const [influence, setInfluence] = useState<any>({});
  const [curation, setCuration] = useState<any>({});
  const [collection, setCollection] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useState<any>({});
  const [activeHandleIndex, setActiveHandleIndex] = useState<number>(0);
  const [pub, setPub] = useState<any>({});
  const [activeTag1, setActiveTag1] = useState<number>(0);
  const [activeTag2, setActiveTag2] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkRadarName, setCheckRadarName] = useState<string>("");
  const [activeHandleIdx, setActiveHandleIdx] = useState<number>(0);
  const [rankInfo, setRankInfo] = useState<any>({});

  const params: any = useParams();
  const { address } = params;

  const [rador1, setRador1] = useState([
    { name: "Influence", value: 0 },
    { name: "Campaign", value: 0 },
    { name: "Creation", value: 0 },
    { name: "Curation", value: 0 },
    { name: "Collection", value: 0 },
    { name: "Engagement", value: 0 },
  ]);

  const [rador2, setRador2] = useState([
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "Curation", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
  ]);

  const [rador3, setRador3] = useState([
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "Campaign", value: 0 },
    { name: "Engagement", value: 0 },
  ]);

  const onClose = () => {
    setShowList(false);
    setRankPageNo(1);
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

  const getRankList = async () => {
    setRankLoading(true);
    const res: any = await api.get(`/lens/${rankType}/rank/list`, {
      params: {
        limit: defaultPageLimit,
        offset: (rankPageNo - 1) * defaultPageLimit,
      },
    });
    setRankLoading(false);
    setRankTotal(res.data.total);
    setRankList(res.data.data);
  };

  const getLensHandle = async () => {
    const res: any = await api.get(`/lens/handles/${address}`);
    setHandlesList(res.data);
  };

  const getIndicators = async (profileId: string) => {
    const res: any = await api.get(`/lens/indicators/${profileId}`);
    setUserInfo((prev: any) => ({
      ...prev,
      ...res.data,
    }));
  };

  useEffect(() => {
    const {influRank,campaignRank,creationRank,curationRank,collectionRank,engagementRank } = rankInfo;

    setRador1(() => {
      return [
        ...[{ name: "Influence", value: influRank },
        { name: "Campaign", value: campaignRank },
        { name: "Creation", value: creationRank },
        { name: "Curation", value: curationRank },
        { name: "Collection", value: collectionRank },
        { name: "Engagement", value: engagementRank },]
      ]
    })

    setRador2(() => {
      return [
        ...[{ name: "", value: 0},
        { name: "", value: 0 },
        { name: "", value: 0 },
      { name: "Curation", value: curationRank },
        { name: "", value: 0 },
        { name: "", value: 0 },]
      ]
    })

    setRador3(() => {
      return [
        ...[{ name: "", value: 0 },
        { name: "Campaign", value: campaignRank },
        { name: "", value: 0 },
        { name: "", value: 0 },
        { name: "", value: 0 },
        { name: "Engagement", value: engagementRank },]
      ]
    })
  }, [rankInfo]);

  const getRankInfo = async (profileId: string) => {
    const res: any = await api.get(`/lens/scores/${profileId}`);
    setRankInfo((prev: any) => ({
      ...prev,
      ...res.data,
    }));
  };

  const getInfluence = async (profileId: string) => {
    const res: any = await api.get(`/lens/influence/${profileId}`);
    setInfluence(res.data);
  };

  const getCuration = async (profileId: string) => {
    const res: any = await api.get(`/lens/curation/${profileId}`);
    setCuration(res.data);
  };

  const getCollection = async (profileId: string) => {
    const res: any = await api.get(`/lens/collection/${profileId}`);
    setCollection(res.data);
  };

  const getPub = async (profileId: string) => {
    const res: any = await api.get(`/lens/topPub/${profileId}`);
    setPub(res.data);
  };

  const getUserInfo = async (profileId: string) => {
    getRankInfo(profileId);
    getIndicators(profileId);
    getInfluence(profileId);
    getCollection(profileId);
    getCuration(profileId);
    getPub(profileId);
    getRankList();
  };

  const showRank = (name: string) => {
    setActiveHandleIdx(typeList.indexOf(name));
    setShowList(true);
  };

  const onRankChange = (val: number) => {
    setRankPageNo(val);
  };

  useEffect(() => {
    if (!rankType || !rankPageNo) {
      return;
    }
    getRankList();
  }, [rankPageNo, rankType]);

  // useEffect(() => {
  //   if (!account) {
  //     return;
  //   }
  //   getLensHandle();
  // }, [account]);

  useEffect(() => {
    if (!address) {
      return;
    }
    getLensHandle();
  }, [address]);

  useEffect(() => {
    if (!handlesList || handlesList.length === 0) {
      return;
    }

    const profile = handlesList[activeHandleIndex];

    setCurrentProfile(profile);
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
        <Wallet />
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
                        {currentProfile.name || currentProfile.handle}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
                <div>@{currentProfile.handle}</div>
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
                showList={(name: string) => showRank(name)}
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
                      <p>{new BN(userInfo.following).toFormat()}</p>
                      <p>Following</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.follower).toFormat()}</p>
                      <p>Followers</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <p>{new BN(userInfo.collect).toFormat()}</p>
                      <p>Collections</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.collectBy).toFormat()}</p>
                      <p>Collected</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>{new BN(userInfo.publication).toFormat()}</p>
                      <p>Publications</p>
                    </div>
                    <div className="diff-sty-info">
                      <p>
                        <span>{new BN(userInfo.post).toFormat()}</span>
                        <span>Posts</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.comment).toFormat()}</span>
                        <span>Comments</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.mirror).toFormat()}</span>
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
                        <div
                          className="drop-menu"
                          key={i}
                          onClick={() => {
                            setActiveHandleIdx(i);
                            setRankType(t.toLowerCase());
                            setRankPageNo(1);
                          }}
                        >
                          {t}
                        </div>
                      ))}
                    </Menu>
                  }
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="space overall">
                      <span className="list-type">
                        {typeList[activeHandleIdx]}
                      </span>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <Spin spinning={rankLoading}>
                  {rankList.map((t: any, i) => (
                    <div className="rank-item" key={i}>
                      <span>{t.rank}</span>
                      <span>k</span>
                      <span>{t.profileId}</span>
                      <span>
                        <img src={imgRadarSmall} alt="" />
                      </span>
                      <span>Score: {new BN(t.score).toFixed(2)}</span>
                    </div>
                  ))}
                </Spin>
                <div className="pagination">
                  <Pagination
                    simple
                    current={rankPageNo}
                    pageSize={defaultPageLimit}
                    onChange={onRankChange}
                    total={rankTotal}
                  />
                </div>
              </div>
            </Drawer>
          </div>
          <div className="btn-group-1">
            <div>
              {tag1.map((t: string, i: number) => (
                <div
                  className={activeTag1 == i ? "activeBtnGroup btnTb" : "btnTb"}
                  onClick={() => setActiveTag1(i)}
                  key={i}
                >
                  {t}
                </div>
              ))}
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
            {activeTag1 === 0 && (
              <div className="right-text">
                <p>YOUR 2022 LENS-PRINT</p>
                <p>
                  YOU HAVE POSTED{" "}
                  <span>{new BN(userInfo.post).toFormat()}</span> POSTS,{" "}
                  <span>{new BN(userInfo.comment).toFormat()}</span> COMMENTS,{" "}
                  <span>{new BN(userInfo.mirror).toFormat()}</span> MIRRORS,
                  KEEP CREATING IN THE NEW YEAR!
                </p>
                <p>
                  YOU HAVE RECEIVED <span>_NUM_</span> COMMENTS AND{" "}
                  <span>_NUM_</span> MIRRORS, YOUR VOICE IS ALWAYS ECHOED AND
                  FLOWERS ARE ALWAYS WITH YOU.
                </p>
                <p>
                  YOUR CAMPAIGN RATING IS <span>_NUM_</span> ,YOUR RANKING IS{" "}
                  <span>_NUM_</span> ,AND YOUR ENGAGEMENT RATING IS{" "}
                  <span>_NUM_</span>.
                </p>
                <p>
                  YOUR ENGAGEMENT SCORE IS <span>_NUM_</span> AND YOUR RANK IS{" "}
                  <span>_NUM_</span>.
                </p>
              </div>
            )}
            {activeTag1 === 1 && (
              <div className="right-text">
                <p>YOUR 2022 LENS-PRINT</p>
                <p>
                  YOU HAVE MIRRORED A TOTAL OF{" "}
                  <span>{new BN(userInfo.mirror).toFormat()}</span> PIECES OF
                  CONTENT. THROUGH YOUR MIRRORS.
                </p>
                <p>
                  YOU HAVE BROUGHT{" "}
                  <span>{new BN(userInfo.collect).toFormat()}</span> TIMES
                  COLLECT TO THE ORIGINAL AUTHORS, AND WE APPRECIATE EVERY
                  MIRROR YOU MADE.
                </p>
              </div>
            )}
          </div>
          <div className="btn-group-2">
            <div>
              {tag2.map((t: string, i: number) => (
                <div
                  className={activeTag2 == i ? "activeBtnGroup btnTb" : "btnTb"}
                  onClick={() => setActiveTag2(i)}
                  key={i}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="collect_pablication">
            {activeTag2 === 0 && (
              <div className="left-text">
                <p>YOUR 2022 LENS-PRINT</p>
                <p>
                  THE CONTENT YOU POSTED WAS COLLECTED A TOTAL OF{" "}
                  <span>{new BN(userInfo.collectBy).toFormat()}</span> TIMES.
                </p>
                <p>
                  YOUR COLLECTED{" "}
                  <span>{new BN(userInfo.collect).toFormat()}</span> VALUABLE
                  CONTENT.
                </p>
                <p>
                  YOUR HAVE A CREATION SCORE OF{" "}
                  <span>{new BN(collection.creationScore).toFixed(2)}</span>, A
                  RANK OF <span>{collection.creationRank}</span>, AND YOUR
                  COLLECTION SCORE IS{" "}
                  <span>{new BN(collection.collectionScore).toFixed(2)}</span>{" "}
                  AND YOUR RANKING IS <span>{collection.collectionRank}</span>.
                </p>
                <p>
                  YOUR 2022 HAVE MIRRORED A TOTAL OF{" "}
                  <span>{new BN(userInfo.mirror).toFormat()}</span> OF CONTENT.
                </p>
              </div>
            )}
            {activeTag2 === 1 && (
              <div className="left-text">
                <p>IN THE PAST YEAR</p>
                <p>
                  THE CONTENT YOU POSTED HAS BEEN COLLECTED A TOTAL OF{" "}
                  <span>{new BN(userInfo.collectBy).toFormat()}</span> TIMES,
                  AND YOUR SHARING ALWAYS ATTRACTS COUNTLESS ATTENTION.
                </p>
                <p>
                  YOU HAVE A CREATION SCORE OF{" "}
                  <span>{new BN(collection.creationScore).toFixed(2)}</span> ,A
                  RANK OF <span>{collection.creationRank}</span>, AND A
                  COLLECTION SCORE OF{" "}
                  <span>{new BN(collection.collectionScore).toFixed(2)}</span>.
                </p>
                <p>
                  YOUR COLLECTION SCORE IS{" "}
                  <span>{new BN(collection.collectionScore).toFixed(2)}</span>{" "}
                  AND YOUR RANKING IS <span>{collection.collectionRank}</span>.
                </p>
                <p>YOUR MOST STREAMED POST WAS:</p>
              </div>
            )}
            <div className="right-rador">
              <Radar
                data={rador3}
                id="top-rador_2"
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <Comment
            data={{
              headImg: "",
              name: "KNN3 Network",
              lensHandle: "@knn3network.lens",
              msg: "GM and CRAZY THURSDA",
              commentImg: S2,
              iconNum1: "10",
              iconNum2: "10",
              iconNum3: "10",
              iconNum4: "10",
            }}
          />
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
            <div>
              <img src={IconG5} alt="" />
            </div>
            <div>
              <TwitterOutlined />
            </div>
          </div>
        </div>
      </Modal>
      {/* <RankList
        close={() => setShowList(false)}
        isShow={showList}
        activeName={checkRadarName}
      /> */}
    </div>
  );
}
