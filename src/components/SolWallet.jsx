import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as bip39 from "bip39";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

import { HDKey } from "micro-ed25519-hdkey";
import { Buffer } from "buffer";

window.Buffer = Buffer;

const SolWallet = () => {
  const { mnemonic } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setIndex] = useState(0);
  const [solwallets, setSolWallets] = useState([]);
  const [selectedPrivateKey, setSelectedPrivateKey] = useState("");
  const [lastAirdropTime, setLastAirdropTime] = useState({});
  const api = process.env.REACT_APP_ALCHEMY_API_KEY;
  const RPC_ENDPOINTS = [
    clusterApiUrl("devnet"),
    `https://solana-devnet.g.alchemy.com/v2/${api}`,
    // Remove or replace with your own Alchemy key
    // "https://solana-devnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
  ];

  const goBack = () => {
    navigate("/mnemonic");
  };

  const fetchBalance = async (address) => {
    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const connection = new Connection(endpoint, "confirmed");
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
      } catch (error) {
        console.error(`Error fetching balance from ${endpoint}:`, error);
      }
    }
    throw new Error("Failed to fetch balance from all endpoints");
  };

  const AirDropSol = async (address) => {
    const now = Date.now();
    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (
      lastAirdropTime[address] &&
      now - lastAirdropTime[address] < cooldownPeriod
    ) {
      alert(
        "Please wait 24 hours between airdrop requests for the same address."
      );
      return;
    }

    for (const endpoint of RPC_ENDPOINTS) {
      try {
        const connection = new Connection(endpoint, "confirmed");
        const WALLET_ADDRESS = address;
        const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL

        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`);
        const signature = await connection.requestAirdrop(
          new PublicKey(WALLET_ADDRESS),
          AIRDROP_AMOUNT
        );
        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash();
        await connection.confirmTransaction(
          {
            blockhash,
            lastValidBlockHeight,
            signature,
          },
          "finalized"
        );
        console.log(
          `Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );

        // Update wallet balance
        const updatedBalance = await fetchBalance(WALLET_ADDRESS);
        setSolWallets((prevWallets) =>
          prevWallets.map((wallet) =>
            wallet.address === WALLET_ADDRESS
              ? { ...wallet, Balance: updatedBalance }
              : wallet
          )
        );

        setLastAirdropTime((prev) => ({ ...prev, [address]: now }));
        alert("Airdrop successful!");
        return; // Exit the function if airdrop is successful
      } catch (error) {
        console.error(`Airdrop failed with endpoint ${endpoint}:`, error);
        if (
          error.message.includes("429") ||
          error.message.includes("too many airdrops")
        ) {
          alert(
            "You've reached the airdrop limit. Please wait 24 hours before requesting another airdrop."
          );
          return; // Exit the function if we hit the rate limit
        }
      }
    }
    alert("Airdrop failed. Please try again later.");
  };

  const generateWallet = async () => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const hd = HDKey.fromMasterSeed(seed.toString("hex"));

      const path = `m/44'/501'/${currentIndex}'/0'`;

      const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
      const publicKey = keypair.publicKey.toString();
      const balance = await fetchBalance(publicKey);
      console.log(balance);
      const newWallets = [
        ...solwallets,
        {
          address: publicKey,
          privateKey: Buffer.from(keypair.secretKey).toString("hex"),
          Balance: balance,
        },
      ];

      setIndex(currentIndex + 1);
      setSolWallets(newWallets);

      localStorage.setItem("solwallets", JSON.stringify(newWallets));
    } catch (error) {
      console.error("Failed to generate wallet:", error);
      alert("Failed to generate wallet. Please try again.");
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
            className="text-black mt-5 w-3/4 flex items-center justify-between p-7 bg-base-100 rounded-md"
          >
            <p>
              Sol - {wallet.address}
              <br />
              balance- {wallet.Balance}
            </p>

            <div className="text-center flex flex-row">
              <button
                className="btn bg-base-300 text-white hover:bg-black border-0"
                onClick={() => openModal(wallet.privateKey)}
              >
                Private Key
              </button>
              <button
                className="btn ml-4 bg-base-300 text-white hover:bg-black border-0"
                onClick={() => AirDropSol(wallet.address)}
              >
                AirDrop Sol
              </button>
            </div>
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
