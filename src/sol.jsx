// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { mnemonicToSeed } from "bip39";
// import { ethers } from "ethers";

// const EthWallet = () => {
//   const { mnemonic } = useParams();
//   const navigate = useNavigate();
//   const [currentIndex, setIndex] = useState(0);
//   const [wallets, setWallets] = useState([]);
//   const [selectedPrivateKey, setSelectedPrivateKey] = useState("");
//   const [balances, setBalances] = useState({});

//   const provider = new ethers.JsonRpcProvider(
//     "https://solana-devnet.g.alchemy.com/v2/Cojj_FwYQcr0bGp1MlsIMdiCnoZffDcT"
//   );

//   const goBack = () => {
//     navigate(-1);
//   };

//   const getBalance = async (address) => {
//     try {
//       const balance = await provider.getBalance(address);
//       return ethers.formatEther(balance);
//     } catch (error) {
//       console.error("Failed to get balance:", error);
//       return "Error";
//     }
//   };

//   const generateWallet = async () => {
//     try {
//       const seed = await mnemonicToSeed(mnemonic);
//       const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
//       const hdNode = ethers.HDNodeWallet.fromSeed(seed);
//       const child = hdNode.derivePath(derivationPath);
//       const privateKey = child.privateKey;
//       const wallet = new ethers.Wallet(privateKey);
//       const balance = await getBalance(wallet.getAddress());

//       setIndex(currentIndex + 1);

//       const newWallets = [
//         ...wallets,
//         {
//           address: await wallet.getAddress(),
//           privateKey: privateKey,
//           balance: balance,
//         },
//       ];
//       setWallets(newWallets);

//       localStorage.setItem("wallets", JSON.stringify(newWallets));
//     } catch (error) {
//       console.error("Failed to generate wallet:", error);
//     }
//   };

//   useEffect(() => {
//     try {
//       const savedWallets = localStorage.getItem("wallets");
//       if (savedWallets) {
//         setWallets(JSON.parse(savedWallets));
//       }
//     } catch (error) {
//       console.error("Failed to parse wallets from local storage:", error);
//       localStorage.removeItem("wallets");
//     }
//   }, []);

//   const openModal = (privateKey) => {
//     setSelectedPrivateKey(privateKey);
//     document.getElementById("my_modal_4").showModal();
//   };

//   // const checkBalance = async (address) => {
//   //   const bal = await getBalance(address);
//   //   setBalances((prevBalances) => ({
//   //     ...prevBalances,
//   //     [address]: bal,
//   //   }));
//   // };

//   return (
//     <div className="bg-base-200 min-h-screen bg-warning">
//       <div className="navbar shadow-lg shadow-base-100 bg-base-100 top-0 sticky">
//         <div className="navbar-start">
//           <button
//             className="btn btn-ghost text-xl flex items-center"
//             onClick={goBack}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             Back
//           </button>
//         </div>
//         <div className="navbar-center">
//           <a className="btn btn-ghost text-xl">Ethereum Wallet</a>
//         </div>
//         <div className="navbar-end"></div>
//       </div>
//       <div className="flex-grow flex w-full justify-center flex-row  bg-warning">
//         <div className="text-center mt-4 flex flex-row items-center">
//           <button
//             className="btn btn-primary mb-2 bg-base-300 text-white hover:bg-black border-0"
//             onClick={generateWallet}
//           >
//             Generate Wallet
//           </button>
//         </div>
//       </div>
//       <div className="flex-grow flex justify-center items-center bg-warning"></div>
//       <div className="w-auto min-h-2.5 bg-warning p-4">
//         <h3 className="text-center text-3xl">Here are your wallets</h3>
//         {wallets.map((wallet, index) => (
//           <div
//             key={index}
//             className="text-black m-5 w-3/4 flex items-center justify-between p-7 bg-base-100 rounded-md"
//           >
//             <p>
//               Eth - {wallet.address}
//               <br />
//               Balance:{wallet.balance} Eth
//             </p>
//             <div className="text-center mt-4 flex flex-row items-center ">
//               <button
//                 className="btn btn-primary mb-2 mx-6 bg-base-300 text-white hover:bg-black border-0"
//                 onClick={() => openModal(wallet.privateKey)}
//               >
//                 Private Key
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <dialog id="my_modal_4" className="modal">
//         <div className="modal-box w-11/12 max-w-3xl bg-base-100">
//           <h3 className="font-bold text-lg">Private Key!</h3>
//           <p className="py-4">{selectedPrivateKey}</p>
//           <div className="modal-action">
//             <form method="dialog">
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default EthWallet;
