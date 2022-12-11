import React, { useState, useEffect } from 'react';
import './index.scss';
import IconRank from "./../../static/img/rank.png";
import IconCopy from "./../../static/img/copy.png";
import LabelWarn from "./../../static/img/warn.png";
import LabelEng from "./../../static/img/eng.png";
import LabelCollect from "./../../static/img/collect.png";
import Icon1 from "./../../static/img/s1.png";
import Icon2 from "./../../static/img/s2.png";
import { copyToClipboard } from "./../../utils/tools";
import { TwitterOutlined, MessageOutlined, HddOutlined, HeartOutlined, SwapOutlined } from '@ant-design/icons';
import Radar from './components/Radar'

export default function Home() {
  const [tags, ] = useState([
    'Influence',
    'Campaign',
    'Creation',
    'Curation',
    'Collection',
    'Engagement'
  ]);

  const [activeTag, setActiveTag] = useState(0)

  return (
    <div className='toscore'>
      <div className='toscore-head'>
        <div className='toscore-head-graphical'>
          <div></div>
          <div className='parallelogram'></div>
          <div className='parallelogram'></div>
          <div className='parallelogram'></div>
        </div>
        <div className='toscore-head-btn'>Connect Wallet</div>
      </div>
      <div className='toscore-content'>
        <div>
          <div className='base-info'>
            <div>K</div>
            <div>
              <div>0x1...fbs
                <span><img
                  alt=""
                  src={IconCopy}
                  onClick={() => copyToClipboard('')}
                  className="copyIcon"
                /></span>
              </div>
              <div><div className='twitter'><TwitterOutlined /></div><span>@Knn3Network</span></div>
            </div>
            <div className='info-num'>
              <div>544</div>
              <div>Score</div>
            </div>
            <div className='info-num border-num'>
              <div>12,912</div>
              <div>Rank</div>
            </div>
            <div className='info-num'>
              <div>12</div>
              <div>POAPs</div>
            </div>
          </div>
          <div>
            <div className='base-detail-top'>
              <div>
                <div>
                  KNN3 Network
                </div>
                <div>@knn3network.lens</div>
              </div>
              <div>Follow</div>
            </div>
            <div className='base-detail-rador'>
              <div>
                <div className='base-detail-rador-info'>
                  <div>
                    <div>
                      32
                    </div>
                    <div>
                      Following
                    </div>
                  </div>
                  <div>
                    <div>
                      12,912
                    </div>
                    <div>
                      Followers
                    </div>
                  </div>
                </div>
                <div className='base-detail-rador-info'>
                  <div>
                    <div>
                      32
                    </div>
                    <div>
                      Publications
                    </div>
                  </div>
                  <div className='diff'>
                    <div>
                      <span>2,912</span>
                      <span>Posts</span>
                    </div>
                    <div>
                      <span>23,601</span>
                      <span>Comments</span>
                    </div>
                    <div>
                      <span>910</span>
                      <span>Mirrors</span>
                    </div>
                  </div>
                </div>
                <div className='base-detail-rador-info'>
                  <div>
                    <div>
                      32
                    </div>
                    <div>
                      Collections
                    </div>
                  </div>
                  <div>
                    <div>
                      12,912
                    </div>
                    <div>
                      Spent
                    </div>
                  </div>
                </div>
                <div className='base-detail-rador-info'>
                  <div>
                    <div>
                      32
                    </div>
                    <div>
                      Collectors
                    </div>
                  </div>
                  <div>
                    <div>
                      12,912
                    </div>
                    <div>
                      Collectors
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Radar
                  id="chart-bar"
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </div>
            <div className='base-detail-tag'>
              <div className='tag-item'>
                {
                  tags.map((item: any, index: number) =>
                    <div className={index == activeTag ? 'active tag' : 'tag'} onClick={() => setActiveTag(index)}>{item}</div>
                  )
                }
              </div>

              <div className='date'>Dec 5 - Dec 11</div>
              {
                activeTag === 0 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Following</span>
                      <span>1,132</span>
                      <span className='red'>+62</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Followers</span>
                      <span>32</span>
                      <span className='green'>-2</span>
                    </div>
                  </div>
                </div>
              }

              {
                activeTag === 1 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Post</span>
                      <span>130</span>
                      <span className='red'>+32</span>
                    </div>
                    <div>
                      <span>Comment (by)</span>
                      <span>320</span>
                      <span className='red'>+20</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Comment (to)</span>
                      <span>320</span>
                      <span className='red'>+20</span>
                    </div>
                    <div>
                      <span>Mirror (by)</span>
                      <span>32</span>
                      <span className='green'>+15</span>
                    </div>
                  </div>
                </div>
              }

              {
                activeTag === 2 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Comment (to)</span>
                      <span>1,132</span>
                      <span className='red'>+62</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Mirror (to)</span>
                      <span>32</span>
                      <span className='green'>-2</span>
                    </div>
                  </div>
                </div>
              }

              {
                activeTag === 3 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Earning</span>
                      <span>1,132</span>
                      <span className='red'>+62</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Collectors</span>
                      <span>32</span>
                      <span className='green'>-2</span>
                    </div>
                  </div>
                </div>
              }

              {
                activeTag === 4 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Collectins</span>
                      <span>1,132</span>
                      <span className='red'>+62</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Spent</span>
                      <span>32</span>
                      <span className='green'>-2</span>
                    </div>
                  </div>
                </div>
              }

              {
                activeTag === 5 &&
                <div className='rank-item'>
                  <div>
                    <img src={IconRank} alt="" />
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Rank</span>
                      <span>3</span>
                      <span className='red'>↑1</span>
                    </div>
                    <div>
                      <span>Mirror (to)</span>
                      <span>130</span>
                      <span className='red'>+32</span>
                    </div>
                    <div>
                      <span>Sales (paid)</span>
                      <span>320</span>
                      <span className='red'>+20</span>
                    </div>
                  </div>
                  <div className='rank-info'>
                    <div>
                      <span>Score</span>
                      <span>12,912</span>
                      <span className='red'>+206</span>
                    </div>
                    <div>
                      <span>Sales (free)</span>
                      <span>320</span>
                      <span className='red'>+20</span>
                    </div>
                    <div>
                      <span>Referral fee</span>
                      <span>32</span>
                      <span className='green'>+15</span>
                    </div>
                  </div>
                </div>
              }


            </div>
          </div>
          <div>
            <div className='title'>Featured Publication</div>
            <div className='des'>what is rank and score blah blah blah</div>
            <div className='item'>
              <div className='con'>
                <div className='type'>Post</div>
                <div className='label'>
                  <img src={LabelEng} alt="" />
                  <img src={LabelWarn} alt="" />
                </div>
                <div className='head'>
                  <div>K</div>
                  <div>
                    <div>KNN3 Network
                      <span className='date-des'>
                        2 days ago
                      </span>
                    </div>
                    <div><span>@knn3network.lens</span></div>
                  </div>
                </div>
                <div className='msg'>GM and CRAZY THURSDA</div>
                <div className='msg-img'>
                  <img src={Icon1} alt="" />
                  <img src={Icon2} alt="" />
                </div>
                <div className='pro-data'>
                  <div>
                    <span><MessageOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><SwapOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><HddOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><HeartOutlined /></span>
                    <span>45</span>
                  </div>
                </div>
              </div>

              <div className='con'>
                <div className='type'>Comment</div>
                <div className='label'>
                  <img src={LabelCollect} alt="" />
                </div>
                <div className='head'>
                  <div>K</div>
                  <div>
                    <div>KNN3 Network
                      <span className='date-des'>
                        2 days ago
                      </span>
                    </div>
                    <div><span>@knn3network.lens</span></div>
                  </div>
                </div>
                <div className='msg'>Ok, sure</div>
                <div className='pro-data'>
                  <div>
                    <span><MessageOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><SwapOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><HddOutlined /></span>
                    <span>45</span>
                  </div>
                  <div>
                    <span><HeartOutlined /></span>
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
