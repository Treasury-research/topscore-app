import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import config from "../../../../config";
import axios from "axios";
import { TwitterShareButton } from "react-share";
import useWeb3Context from "../../../../hooks/useWeb3Context";
import useClaimContract from "../../../../contract/useClaimContract";
import useERC721Contract from "../../../../contract/useErc721Contract";
import { TwitterOutlined } from "@ant-design/icons";
import IconLenster from "./../../../../static/img/g5.svg";

export default function ClaimModal({ onCancel }: any) {
  const claimContract = useClaimContract();
  const erc721Contract = useERC721Contract();
  const [merkleProof, setMerkleProof] = useState<any>([]);
  const [checking, setChecking] = useState(true);
  const [canClaim, setCanClaim] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const { account } = useWeb3Context();
  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const getMerkleProof = async () => {
    const res: any = await axios.get(
      `${config.baseURL}/v1/merkletree/${account}`
    );

    if (res.data.result.length === 0) {
      setChecking(false);
    }

    setMerkleProof(() => [...res.data.result]);
  };

  const checkCanClaim = async () => {
    const res = await claimContract.canClaim(merkleProof);
    setCanClaim(res);
    setChecking(false);
  };

  const doClaim = async () => {
    await claimContract.claim(merkleProof);
    checkBalance();
    setCanClaim(false);
  };

  const checkBalance = async () => {
    const res = await erc721Contract.balanceOf(config.contracts.nft);
    if (res > 0) {
      const tokenId = await erc721Contract.getTokenId(config.contracts.nft);
      const res = await erc721Contract.getNftInfo(
        config.contracts.nft,
        tokenId
      );
      setImageUri(res.imageUri);
    }
  };

  const LensterShareButton = ({ text, url, hashtags, children }: any) => {
    return (
      <a
        target="_blank"
        href={`https://lenster.xyz/?text=${text}&url=${url}&hashtags=${hashtags}&preview=true`}
      >
        {children}
      </a>
    );
  };

  useEffect(() => {
    if (!account) {
      return;
    }

    getMerkleProof();
    checkBalance();
  }, [account]);

  useEffect(() => {
    if (!merkleProof || merkleProof.length === 0) {
      return;
    }
    checkCanClaim();
  }, [merkleProof]);

  return (
    <Modal
      className="claimModal"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
    >
      {imageUri ? (
        <img className="claim-img" src={imageUri} />
      ) : (
        <div className="claim-img" />
      )}
      <div className="claim-bottom">
        {checking ? (
          <div>Checking...</div>
        ) : canClaim ? (
          <div onClick={doClaim}>Mint</div>
        ) : imageUri ? (
          <div>You have minted</div>
        ) : (
          <div>You haven’t reserved</div>
        )}
        {(canClaim || imageUri) && (
          <div>
            <div>
              <LensterShareButton
                text="Hello world"
                url="https://topscore.knn3.xyz"
                hashtags="Topscore"
              >
                <img src={IconLenster} />
              </LensterShareButton>
            </div>
            <div>
              <TwitterShareButton
                url="https://topscore.knn3.xyz"
                title="Hello world"
              >
                <TwitterOutlined className="twitter-icon" />
              </TwitterShareButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
