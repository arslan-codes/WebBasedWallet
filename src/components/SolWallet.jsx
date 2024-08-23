import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mnemonicToSeed } from "bip39";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

import { HDKey } from "micro-ed25519-hdkey";
import { Buffer } from "buffer";
window.Buffer = Buffer;
const SolWallet = () => {
  const { mnemonic } = useParams(); // Get mnemonic from URL params
  const navigate = useNavigate(); // Use parentheses to call the hook

  const [currentIndex, setIndex] = useState(0);
  const [solwallets, setSolWallets] = useState([]);
  const [selectedPrivateKey, setSelectedPrivateKey] = useState(""); // State to hold the selected private key for modal

  const goBack = () => {
    navigate(-1); // Navigate back in history
  };

  const generateWallet = async () => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const hd = HDKey.fromMasterSeed(seed.toString("hex"));

      const path = `m/44'/501'/${currentIndex}'/0'`;

      const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
      const publicKey = keypair.publicKey.toString(); // Convert PublicKey to string

      const newWallets = [
        ...solwallets,
        {
          address: publicKey,
          privateKey: Buffer.from(keypair.secretKey).toString("hex"), // Convert secretKey to hex string
        },
      ];

      setIndex(currentIndex + 1);
      setSolWallets(newWallets);

      // Save to local storage
      localStorage.setItem("solwallets", JSON.stringify(newWallets));
    } catch (error) {
      console.error("Failed to generate wallet:", error);
    }
  };

  useEffect(() => {
    try {
      const savedWallets = localStorage.getItem("solwallets");
      if (savedWallets) {
        setSolWallets(JSON.parse(savedWallets));
      }
    } catch (error) {
      console.error("Failed to parse wallets from local storage:", error);
      // localStorage.removeItem("solwallets");
    }
  }, []);

  const openModal = (privateKey) => {
    setSelectedPrivateKey(privateKey);
    document.getElementById("my_modal_4").showModal();
  };

  return (
    <div className="bg-base-200 min-h-screen bg-warning">
      <div className="navbar shadow-lg shadow-base-100 bg-base-100 top-0 sticky">
        <div className="navbar-start">
          <button
            className="btn btn-ghost text-xl flex items-center"
            onClick={goBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Solana Wallet</a>
        </div>
        <div className="navbar-end"></div>
      </div>
      <div className="flex-grow flex justify-center items-center bg-warning">
        <div className="text-center mt-4 flex flex-col items-center">
          <h2 className="mb-4">Click here to generate your wallets</h2>
          <button
            className="btn btn-primary mb-2 bg-base-300 text-white hover:bg-black border-0"
            onClick={generateWallet}
          >
            Generate Wallet
          </button>
        </div>
      </div>

      <div className="w-auto min-h-2.5 bg-warning p-4">
        <h3 className="text-center text-3xl">Here are your Solana wallets</h3>
        {solwallets.map((wallet, index) => (
          <div
            key={index}
            className="text-black m-5 w-6/12 flex items-center justify-evenly p-7 bg-base-100 rounded-md"
          >
            <p>
              Sol - {wallet.address}
              <br />
              balance 0 Sol
            </p>
            <button
              className="btn ml-4 bg-base-300 text-white hover:bg-black border-0"
              onClick={() => openModal(wallet.privateKey)}
            >
              Private Key
            </button>
          </div>
        ))}
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-3xl bg-base-100">
          <h3 className="font-bold text-lg">Private Key!</h3>
          <p className="py-4">{selectedPrivateKey}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SolWallet;
