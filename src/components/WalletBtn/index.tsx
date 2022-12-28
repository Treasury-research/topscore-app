import React, { useState, useEffect } from "react";
import "./index.scss";
import { shortenAddr } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";

export default function Wallet() {
  const { account, connectWallet } = useWeb3Context();

  return (
    <div>
      {account ? (
        <div className="topscore-head-wallet-btn">{shortenAddr(account)}</div>
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
