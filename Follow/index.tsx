// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import ApproveButton from "components/ApproveButton";
// import useWeb3Context from "hooks/useWeb3Context";
// import { switchChain } from "lib/tool";
// import useLenshubContract from "../../contract/useLenshubContract";
// import useErc20Contract from "../../contract/useErc20Contract";
// import useErc721Contract, { formatIPFS } from "../../contract/useErc721Contract";
// import style from "../style.module.scss";
// import BN from "bignumber.js";
// import useFeeFollowContract from "../../contract/useFeeFollowContract";
// import lensApi from "../../../../lib/lensApi";
// import config from "config";

// export default function Lens({profileId}) {
//   const [followBalance, setFollowBalance] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(true);
//   const [profileInfo, setProfileInfo] = useState({});
//   const [feeInfo, setFeeInfo] = useState({});
//   const [tokenInfo, setTokenInfo] = useState({});
//   const lenshubContract = useLenshubContract();
//   const erc721Contract = useErc721Contract();
//   const erc20Contract = useErc20Contract();
//   const feeFollowContract = useFeeFollowContract();
//   const { account, chainId } = useWeb3Context();

//   const doFollow = async () => {
//     const res = await lenshubContract.follow(profileId, feeInfo);
//     if (res) {
//       setFollowBalance((prev) => {
//         prev.push(res.events.Transfer.returnValues.tokenId);
//         return [...prev];
//       });
//     }
//   };

//   const doUnfollow = async () => {
//     const res = await erc721Contract.burn(
//       profileInfo.followNftAddress,
//       followBalance[0]
//     );
//     if (res) {
//       setFollowBalance((prev) => {
//         prev.splice(0, 1);
//         return [...prev];
//       });
//     }
//   };

//   const getProfile = async () => {
//     setLoading(true);
//     const profileInfoRaw = await lensApi.getProfileByHandle(nodeInfo.handle);
//     setProfileInfo(profileInfoRaw);
//     setLoading(false);

//     const followBalanceRaw = await erc721Contract.getAll(
//       profileInfoRaw.followNftAddress
//     );
//     setFollowBalance(followBalanceRaw);

//     const feeInfoRaw = await feeFollowContract.getProfileData(
//       profileId
//     );

//     setFeeInfo(feeInfoRaw);
//   };

//   const getTokenInfo = async () => {
//     const symbol = await erc20Contract.symbol(feeInfo.currency);
//     const decimals = await erc20Contract.decimals(feeInfo.currency);
//     setTokenInfo({
//       symbol,
//       decimals,
//     });
//   };

//   useEffect(() => {
//     if (!feeInfo.amount || feeInfo.amount === "0") {
//       return;
//     }
//     getTokenInfo();
//   }, [feeInfo]);

//   useEffect(() => {
//     if (!nodeInfo.handle || !account) {
//       return;
//     }
//     getProfile();
//   }, [account, nodeInfo.handle, chainId]);

//   return (
//     <div className="topscore-head-wallet-btn">
//       <div className={style.lensInfo}>
//         {account && (
//           <>
//             {followBalance.length === 0 ? (
//               <>
//                 <ApproveButton
//                   skipCheck={
//                     !feeInfo || !feeInfo.amount || feeInfo.amount === "0"
//                   }
//                   tokenAddress={feeInfo.currency}
//                   contractAddress={config.contracts.lenshub}
//                 >
//                   <div className={style.lensBtn} onClick={doFollow}>
//                     Follow
//                   </div>
//                 </ApproveButton>

//                 {feeInfo.amount && tokenInfo.symbol && (
//                   <div className="text-center">
//                     Price:{" "}
//                     {new BN(feeInfo.amount)
//                       .shiftedBy(-tokenInfo.decimals)
//                       .toString()}{" "}
//                     {tokenInfo.symbol}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div
//                 className={style.lensBtn}
//                 onClick={doUnfollow}
//                 onMouseEnter={() => setIsFollowing((prev) => !prev)}
//                 onMouseLeave={() => setIsFollowing((prev) => !prev)}
//               >
//                 {isFollowing ? "Following" : "Unfollow"}
//               </div>
//             )}
//           </>
//         )}
//         {config.chainId !== chainId && (
//           <a
//             className={style.switchHint}
//             onClick={() => switchChain(config.chainId)}
//           >
//             Switch to polygon to continue.
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }
