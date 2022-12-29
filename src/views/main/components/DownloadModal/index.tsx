import React, { useState, useEffect } from "react";
import { Modal } from "antd";

export default function DownloadModal({ onCancel, profileId }: any) {
  const downloadURL = `https://lens-api.knn3.xyz/api/lens/generate/shareImg/${profileId}`;

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      className="claimModal"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
    >
      <img className="claim-img" src={downloadURL} />
      <div className="claim-bottom">
        <a href={downloadURL} download="my_2022_wrapped.png" target="_blank" className="download-btn">
          <div>Download</div>
        </a>
      </div>
    </Modal>
  );
}
