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
import Header from "./Header";
window.Buffer = Buffer;

const SolWallet = () => {
  const [mnemonic, setMnemonic] = useState("");
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
      const prevmnemonic = localStorage.getItem("mnemonic");

      if (!prevmnemonic) {
        console.error(
          "No mnemonic found. Please generate or import one first."
        );
        return; // Exit early if there's no mnemonic
      }
      if (prevmnemonic) {
        setMnemonic(prevmnemonic);
      }

      console.log(prevmnemonic);
      console.log(mnemonic);
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
    <div className="bg-gradient-to-bl  from-transparent to-slate-200 text-black min-h-screen  ">
      <div className="relative isolate px-6 pt-3 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>{" "}
        <Header />
        <div className="flex-grow flex justify-center items-center  ">
          <div className="text-center mt-4 flex flex-col items-center">
            <h2 className="mb-4">Click here to generate your wallets</h2>
            <button
              className="btn btn-primary mb-2 bg-base-300 text-white hover:bg-zinc-900 border-0"
              onClick={generateWallet}
            >
              Generate Wallet
            </button>
          </div>
        </div>
        <h3 className="text-center text-3xl">Here are your Solana wallets</h3>
        <div className=" flex justify-center items-center ">
          <div className="w-3/4 min-h-2.5  p-4 flex justify-center flex-col ">
            {solwallets.map((wallet, index) => (
              <div
                key={index}
                className="text-black mt-2 w-full flex items-center justify-between p-7 bg-white rounded-md"
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
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-3xl bg-white">
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
    </div>
  );
};

export default SolWallet;
