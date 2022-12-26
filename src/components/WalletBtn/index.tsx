import React, { useState, useEffect } from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";

export default function Wallet() {
  const { account, connectWallet } = useWeb3Context();

  const history = useHistory();

  const walletBtnClick = () => {
    if(history.location.pathname === "/main"){
      history.push(`/address/${account}`)
    }
  }
  
  return (
    <div>
      {account ? (
        <div onClick={() => walletBtnClick()} className="topscore-head-wallet-btn">{shortenAddr(account)}</div>
      ) : (
        <div
          onClick={() => connectWallet()}
          className="topscore-head-wallet-btn"
        >
          Connect Wallet
        </div>
      )}
    </div>
  )
}
