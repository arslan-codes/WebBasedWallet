import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mnemonicToSeed } from "bip39";
import { ethers } from "ethers";
import Header from "./Header";

const EthWallet = () => {
  const [mnemonic, setMnemonic] = useState("");
  // const { mnemonic } = useParams();
  console.log(mnemonic);
  const navigate = useNavigate();
  const [currentIndex, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [selectedPrivateKey, setSelectedPrivateKey] = useState("");

  const provider = new ethers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/Cojj_FwYQcr0bGp1MlsIMdiCnoZffDcT`
  );

  const getBalance = async (address) => {
    try {
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Failed to get balance:", error);
      return "Error";
    }
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

      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
      const hdNode = ethers.HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new ethers.Wallet(privateKey, provider);
      const balance = await getBalance(await wallet.getAddress());

      setIndex(currentIndex + 1);

      const newWallets = [
        ...wallets,
        {
          address: await wallet.getAddress(),
          privateKey: privateKey,
          balance: balance,
        },
      ];
      setWallets(newWallets);

      localStorage.setItem("wallets", JSON.stringify(newWallets));
    } catch (error) {
      console.error("Failed to generate wallet:", error);
    }
  };

  useEffect(() => {
    try {
      const savedWallets = localStorage.getItem("wallets");
      if (savedWallets) {
        setWallets(JSON.parse(savedWallets));
      }
    } catch (error) {
      console.error("Failed to parse wallets from local storage:", error);
      localStorage.removeItem("wallets");
    }
  }, []);

  const openModal = (privateKey) => {
    setSelectedPrivateKey(privateKey);
    document.getElementById("my_modal_4").showModal();
  };

  return (
    <div className="bg-gradient-to-bl  from-transparent to-slate-200 text-black   min-h-screen ">
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
        </div>
        <Header />
        <div className="flex-grow flex w-full justify-center flex-row  ">
          <div className="text-center mt-4 flex flex-row items-center">
            <button
              className="btn btn-primary mb-2 bg-base-300 text-white hover:bg-black border-0"
              onClick={generateWallet}
            >
              Generate Wallet
            </button>
          </div>
        </div>
        <h3 className="text-center text-3xl">Here are your wallets</h3>
        <div className=" flex justify-center items-center ">
          <div className="w-auto min-h-2.5  p-3 flex justify-center flex-col">
            {wallets.map((wallet, index) => (
              <div
                key={index}
                className="text-black m-2 w-full flex items-center justify-between p-7 py-4 bg-white rounded-md"
              >
                <p>
                  Eth - {wallet.address}
                  <br />
                  Balance:{wallet.balance} Eth
                </p>
                <div className="text-center mt-4 flex flex-row items-center ">
                  <button
                    className="btn btn-primary mb-2 mx-6 bg-base-300 text-white hover:bg-black border-0"
                    onClick={() => openModal(wallet.privateKey)}
                  >
                    Private Key
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

export default EthWallet;
