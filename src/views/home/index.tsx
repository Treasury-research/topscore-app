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
import { copyToClipboard } from "../../lib/tool";
import { TwitterOutlined, DownOutlined, CopyOutlined } from "@ant-design/icons";
import Radar from "./components/Radar";
import { Dropdown, Space, Menu } from "antd";

const tags = [
  "Influence",
  "Campaign",
  "Engagement",
  "Creation",
  "Collection",
  "Curation",
];

const NumTrend = ({ current, previous }: any) => {
  if (!current || !previous) {
    return <span>-</span>;
  }
  const isLarger = new BN(current).isGreaterThanOrEqualTo(previous);
  const absoluteValue = new BN(current).minus(previous).absoluteValue();
  const renderValue = `${isLarger ? "+" : "-"}${absoluteValue}`;
  return <span className={isLarger ? "green" : "red"}>{renderValue}</span>;
};

export default function Home() {
  const { account, connectWallet } = useWeb3Context();
  const [handlesList, setHandlesList] = useState<any>([]);
  const [indicators, setIndicators] = useState<any>({});
  const [influence, setInfluence] = useState<any>({});
  const [campaign, setCampaign] = useState<any>({});
  const [creation, setCreation] = useState<any>({});
  const [curation, setCuration] = useState<any>({});
  const [collection, setCollection] = useState<any>({});
  const [engagement, setEngagement] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useState<any>({});
  const [activeTag, setActiveTag] = useState(0);
  const [activeHandle, setActiveHandle] = useState<number>(0);
  const [pub, setPub] = useState<any>({});

  const getLensHandle = async () => {
    const testAccount = "0xcde3725b25d6d9bc78cf0941cc15fd9710c764b9";
    const res: any = await api.get(`/lens/handles/${testAccount}`);
    setHandlesList(res.data);
    // setCurrentProfile(res.data[0]);
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

    const profile = handlesList[activeHandle];

    const profileId = profile.profileId;

    setCurrentProfile(profile);

    switch (activeTag) {
      case 0:
        getInfluence(profileId);
        break;
      case 1:
        getCampaign(profileId);
        break;
      case 2:
        getEngagement(profileId);
        break;
      case 3:
        getCreation(profileId);
        break;
      case 4:
        getCollection(profileId);
        break;
      case 5:
        getCuration(profileId);
        break;
    }
  }, [activeHandle, activeTag, handlesList]);

  useEffect(() => {
    const { profileId } = currentProfile;

    if (!profileId) {
      return;
    }
    console.log("get it");
    getIndicators(profileId);

    getPub(profileId);
  }, [currentProfile]);

  return (
    <div className="toscore">
      <div className="toscore-head">
        <div className="toscore-head-graphical">
          <div></div>
          <div className="parallelogram"></div>
          <div className="parallelogram"></div>
          <div className="parallelogram"></div>
        </div>
        {account ? (
          <div className="toscore-head-btn">{shortenAddr(account)}</div>
        ) : (
          <div className="toscore-head-btn" onClick={connectWallet}>
            Connect Wallet
          </div>
        )}
      </div>
      <div className="toscore-content">
        <div>
          <div className="base-info">
            <div>K</div>
            <div>
              <div>
                {shortenAddr(account)}
                <span>
                  {/* <img
                    alt=""
                    src={IconCopy}
                    onClick={() => copyToClipboard(account)}
                    className="copyIcon"
                  /> */}
                  <CopyOutlined className="copyIcon" onClick={() => copyToClipboard(account)}/>
                </span>
              </div>
              <div>
                <div className="twitter">
                  <TwitterOutlined />
                </div>
                <span>@Knn3Network</span>
              </div>
            </div>
            <div className="info-num">
              <div>544</div>
              <div>Score</div>
            </div>
            <div className="info-num border-num">
              <div>12,912</div>
              <div>Rank</div>
            </div>
            <div className="info-num">
              <div>12</div>
              <div>POAPs</div>
            </div>
          </div>
          <div>
            <div className="base-detail-top">
              <div>
                <div>
                  <Dropdown
                    overlay={
                      <Menu>
                        {handlesList.map((t: any, i: number) => (
                          <div
                            className="drop-menu"
                            key={i}
                            onClick={() => setActiveHandle(i)}
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
                <div>@{currentProfile.handle}</div>
              </div>
              <div>Follow</div>
            </div>
            <div className="base-detail-rador">
              <div>
                <div className="base-detail-rador-info">
                  <div>
                    <div>{indicators.following}</div>
                    <div>Following</div>
                  </div>
                  <div>
                    <div>{indicators.follower}</div>
                    <div>Followers</div>
                  </div>
                </div>
                <div className="base-detail-rador-info">
                  <div>
                    <div>{indicators.publication}</div>
                    <div>Publications</div>
                  </div>
                  <div className="diff">
                    <div>
                      <span>{indicators.post}</span>
                      <span>Posts</span>
                    </div>
                    <div>
                      <span>{indicators.comment}</span>
                      <span>Comments</span>
                    </div>
                    <div>
                      <span>{indicators.mirror}</span>
                      <span>Mirrors</span>
                    </div>
                  </div>
                </div>
                <div className="base-detail-rador-info">
                  <div>
                    <div>{indicators.collect}</div>
                    <div>Collections</div>
                  </div>
                  <div>
                    <div>
                      <img className="g5" src={IconG5} alt="" />
                      <span>0</span>
                    </div>
                    <div>Spent</div>
                  </div>
                </div>
                <div className="base-detail-rador-info">
                  <div>
                    <div>{indicators.collectBy}</div>
                    <div>Collectors</div>
                  </div>
                  <div>
                    <div>
                      <img className="g5" src={IconG5} alt="" />
                      <span>0</span>
                    </div>
                    <div>Earned</div>
                  </div>
                </div>
              </div>
              <div>
                <Radar id="chart-bar" width={"100%"} height={"100%"} />
              </div>
            </div>
            <div className="base-detail-tag">
              <div className="tag-item">
                {tags.map((item: any, index: number) => (
                  <div
                    className={index == activeTag ? "active tag" : "tag"}
                    onClick={() => setActiveTag(index)}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="date">Dec 5 - Dec 11</div>
              {activeTag === 0 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Following</span>
                      <span>{indicators.following}</span>
                      <NumTrend
                        current={indicators.following}
                        previous={influence.lastWeekFollowing}
                      />
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Followers</span>
                      <span>{indicators.follower}</span>
                      <NumTrend
                        current={indicators.follower}
                        previous={influence.lastWeekFollower}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTag === 1 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Post</span>
                      <span>{indicators.post}</span>
                      <NumTrend
                        current={indicators.post}
                        previous={campaign.lastWeekPost}
                      />
                    </div>
                    <div>
                      <span>Comment (by)</span>
                      {/** TODO */}
                      <span>{indicators.comment}</span>
                      <NumTrend
                        current={indicators.comment}
                        previous={campaign.lastWeekCommentBy}
                      />
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Comment (to)</span>
                      <span>{indicators.comment}</span>
                      <NumTrend
                        current={indicators.comment}
                        previous={campaign.lastWeekComment}
                      />
                    </div>
                    <div>
                      <span>Mirror (by)</span>
                      {/** TODO */}
                      <span>{indicators.mirror}</span>
                      <NumTrend
                        current={indicators.mirror}
                        previous={campaign.lastWeekMirrorBy}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTag === 2 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Comment (to)</span>
                      <span>{indicators.comment}</span>
                      <NumTrend
                        current={indicators.comment}
                        previous={engagement.lastWeekComment}
                      />
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Mirror (to)</span>
                      <span>{indicators.mirror}</span>
                      <NumTrend
                        current={indicators.mirror}
                        previous={engagement.lastWeekMirror}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTag === 3 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Earning</span>
                      <span>1,132</span>
                      <span className="red">+62</span>
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Collectors</span>
                      <span>{indicators.collectBy}</span>
                      <NumTrend
                        current={indicators.collectBy}
                        previous={creation.lastWeekCollectBy}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTag === 4 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Collections</span>
                      <span>{indicators.collect}</span>
                      <NumTrend
                        current={indicators.collect}
                        previous={collection.lastWeekCollect}
                      />
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Spent</span>
                      <span>32</span>
                      <span className="green">-2</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTag === 5 && (
                <div className="rank-item">
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className="red">↑1</span>
                    </div>
                    <div>
                      <span>Mirror (to)</span>
                      {/** TODO */}
                      <span>{indicators.mirror}</span>
                      <NumTrend
                        current={indicators.mirror}
                        previous={curation.lastWeekMirror}
                      />
                    </div>
                    <div>
                      <span>Sales (paid)</span>
                      <span>320</span>
                      <span className="red">+20</span>
                    </div>
                  </div>
                  <div className="rank-info">
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className="red">+206</span>
                    </div>
                    <div>
                      <span>Sales (free)</span>
                      <span>320</span>
                      <span className="red">+20</span>
                    </div>
                    <div>
                      <span>Referral fee</span>
                      <span>32</span>
                      <span className="green">+15</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {pub && Object.keys(pub).length > 0 && (
            <div>
              <div className="title">Featured Publication</div>
              <div className="des">what is rank and score blah blah blah</div>
              <div className="item">
                {pub.engagement && (
                  <div className="con">
                    <div className="type">Post</div>
                    <div className="label">
                      <img src={LabelEng} alt="" />
                      <img src={LabelWarn} alt="" />
                    </div>
                    <div className="head">
                      <div>K</div>
                      <div>
                        <div>
                          KNN3 Network
                          <span className="date-des">2 days ago</span>
                        </div>
                        <div>
                          <span>@knn3network.lens</span>
                        </div>
                      </div>
                    </div>
                    <div className="msg">
                      {pub.engagement.publication.metadata.content}
                    </div>
                    {pub.engagement.publication.metadata.image && (
                      <div className="msg-img">
                        <img
                          src={formatIPFS(
                            pub.engagement.publication.metadata.image
                          )}
                        />
                      </div>
                    )}

                    <div className="pro-data">
                      <div>
                        <span>
                          <img src={IconG1} alt="" />
                        </span>
                        <span>{pub.engagement.commentCount}</span>
                      </div>
                      <div>
                        <span>
                          <img src={IconG2} alt="" />
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
                )}

                {pub.collect && (
                  <div className="con">
                    <div className="type">Comment</div>
                    <div className="label">
                      <img src={LabelCollect} alt="" />
                    </div>
                    <div className="head">
                      <div>K</div>
                      <div>
                        <div>
                          KNN3 Network
                          <span className="date-des">2 days ago</span>
                        </div>
                        <div>
                          <span>@knn3network.lens</span>
                        </div>
                      </div>
                    </div>
                    <div className="msg">
                      {pub.collect.publication.metadata.content}
                    </div>
                    {pub.collect.publication.metadata.image && (
                      <div className="msg-img">
                        <img
                          src={formatIPFS(
                            pub.collect.publication.metadata.image
                          )}
                        />
                      </div>
                    )}
                    <div className="pro-data">
                      <div>
                        <span>
                          <img src={IconG1} alt="" />
                        </span>
                        <span>45</span>
                      </div>
                      <div>
                        <span>
                          <img src={IconG2} alt="" />
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
