import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import config from "../../../../config";
import { toast } from "material-react-toastify";
import axios from "axios";
import { TwitterShareButton } from "react-share";
import useWeb3Context from "../../../../hooks/useWeb3Context";
import useClaimContract from "../../../../contract/useClaimContract";
import useERC721Contract from "../../../../contract/useErc721Contract";
import { TwitterOutlined } from "@ant-design/icons";

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
      `${config.claimApi}/api/v1/merkletree/${account}`
    );

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
      width={400}
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