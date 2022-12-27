import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import config from "../../../../config";
import axios from "axios";
import { TwitterShareButton } from "react-share";
import useWeb3Context from "../../../../hooks/useWeb3Context";
import useClaimContract from "../../../../contract/useClaimContract";
import { TwitterOutlined } from "@ant-design/icons";

export default function ClaimModal({ onCancel }: any) {
  const claimContract = useClaimContract();
  const [merkleProof, setMerkleProof] = useState();
  const [canClaim, setCanClaim] = useState(false);
  const { account } = useWeb3Context();
  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const getMerkleProof = async () => {
    const res: any = await axios.get(config.claimApi);
    setMerkleProof(res);
  };

  const checkCanClaim = async () => {
    const res = await claimContract.canClaim(merkleProof);
    setCanClaim(res);
  };

  const doClaim = async () => {
    await claimContract.claim(merkleProof);
  };

  useEffect(() => {
    if (!account) {
      return;
    }

    getMerkleProof();
  }, [account]);

  useEffect(() => {
    checkCanClaim();
  }, [merkleProof]);

  return (
    <Modal
      className="claimModal"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}
    >
      <div className="claim-img"></div>
      <div className="claim-bottom">
        {canClaim ? (
          <div onClick={doClaim}>Mint</div>
        ) : (
          <div>You are not eligible to mint</div>
        )}
        <div>
          <div>
            <TwitterShareButton
              url="https://topscore.knn3.xyz"
              title="Hello world"
            >
              <TwitterOutlined />
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
