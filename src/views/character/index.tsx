import React, { useState, useEffect } from "react";
import "./index.scss";

export default function Character() {

  const [showCharacterDetail, setShowCharacterDetail] = useState(false);

  return (
    <div className="character">
      <div className="character-head">
        <div>
          <div className="character-head-main-btn">Profile</div>
          <div className="character-head-main-btn">CharacteristicDEX</div>
        </div>
        <div className="character-head-wallet-btn">Connect Wallet</div>
      </div>
      {
        !showCharacterDetail &&
        <div className="character-content">
          <div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
            <div>
              <div></div>
              <div>HAPPY</div>
            </div>
          </div>
        </div>
      }
      {/* {
        showCharacterDetail &&
        <div className="character-detail">
          <div className="character-detail-left"></div>
          <div className="character-detail-right">
            <div>HAPPY</div>
            <div>ksahkshdkahdksahdkahksahkshdkahdksahdkahksahkshahkshdkahdksahdkah</div>
            <div className="character-detail-types">
              <div>
                XXXs you may know
              </div>
              <div className="character-detail-types">
                <div>
                  <div>

                  </div>
                  <div>Stani</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      } */}
    </div>
  );
}
