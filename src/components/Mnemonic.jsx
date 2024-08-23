import React, { useEffect, useRef, useState } from "react";
import { generateMnemonic } from "bip39";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MnemonicPage = () => {
  const [mnemonic, setMnemonic] = useState("");
  const prevmnemonic = "";
  const divRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [resetbtn, setresetbtn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setresetbtn(true);
    const prevmnemonic = localStorage.getItem("mnemonic");
    if (prevmnemonic) {
      setMnemonic(prevmnemonic);
      setDisabled(true);
      setresetbtn(false);
    }
  }, []);

  const createSeedPhrase = () => {
    const mn = generateMnemonic();

    setMnemonic(mn);
    localStorage.setItem("mnemonic", mn);
    setDisabled(true);
    localStorage.removeItem("wallets");

    setresetbtn(false);
    navigate(`/mnemonic?mnemonic=${encodeURIComponent(mn)}`);
  };

  const handleCopy = () => {
    if (divRef.current) {
      navigator.clipboard.writeText(divRef.current.innerText);
      console.log(divRef.current.innerText);
    }
  };

  const navigateToEthWallet = () => {
    navigate(`/eth-wallet/${encodeURIComponent(mnemonic)}`);
  };

  const solHandle = () => {
    navigate(`/sol-wallet/${encodeURIComponent(mnemonic)}`);
  };
  const resetphrase = () => {
    setMnemonic("");
    setDisabled(false);
    setresetbtn(true);

    localStorage.removeItem("mnemonic");
    localStorage.removeItem("wallets");
    localStorage.removeItem("solwallets");
  };

  return (
    <div className="bg-base-200  min-h-screen">
      <Header />

      <div className="hero ">
        <div className="hero-content flex-col w-full justify-center">
          <div className="lg:text-left">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Generate a Seed for Wallets
            </h1>
            <button
              className="btn btn-success text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300"
              onClick={createSeedPhrase}
              disabled={disabled}
            >
              Create Seed Phrase
            </button>

            <div className="text-red-700">
              <button
                disabled={resetbtn}
                className="btn btn-outline w-full mt-2"
                onClick={resetphrase}
              >
                Reset
              </button>
              <h5>Note that New seed will remove the previous Wallets.</h5>
              <h4>Make sure to save your seed</h4>
            </div>
          </div>
          <div
            className="bg-base-200 w-75 rounded-md shadow-md shadow-2xl cursor-pointer"
            ref={divRef}
            onClick={handleCopy}
          >
            {mnemonic && (
              <div className="border-2 hover:border-t-9 p-4 border-emarld-950 rounded-lg text-white text-center grid grid-cols-6 gap-2">
                {mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="bg-base-300 p-4 rounded-md shadow-md"
                  >
                    {word}
                  </div>
                ))}
              </div>
            )}
          </div>
          {mnemonic && (
            <div>
              <button className="btn bg-warning" onClick={navigateToEthWallet}>
                Generate Eth Wallet
              </button>
              <label
                htmlFor="my_modal_6"
                className="btn bg-warning m-2"
                onClick={handleCopy}
              >
                Copy Phrase
              </label>
              <button className="btn bg-warning" onClick={solHandle}>
                Generate Sol Wallet
              </button>
            </div>
          )}
        </div>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Your phrase is copied</h3>
            <p className="py-4">{mnemonic}</p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MnemonicPage;
