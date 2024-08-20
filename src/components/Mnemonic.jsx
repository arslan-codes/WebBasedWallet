import React, { useState } from "react";
import { generateMnemonic } from "bip39";

const MnemonicPage = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [resetWallets, setResetWallets] = useState(false);

  const createSeedPhrase = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
    setResetWallets(true); // Trigger the reset of wallets
  };

  return (
    // <div className="p-8 rounded-lg text-black bg-base-300 shadow-lg max-w-2xl w-full grid-cols-2">
    //   <div>
    //
    //   </div>
    //   <div>
    //
    //   </div>
    // </div>

    <div className="hero bg-base-200 min-h-2.5  ">
      <div className="hero-content flex-col lg:flex-column w-full justify-between">
        <div className=" lg:text-left">
          <h1 className="text-3xl  font-bold mb-6 text-center">
            Generate a Seed for Wallets
          </h1>{" "}
          <button
            className="bg-success text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300"
            onClick={createSeedPhrase}
          >
            Create Seed Phrase
          </button>
          <div className="text-red-700">
            <h5>Note that New seed will remove the previous Wallets.</h5>
            <h4>Make sure to sabe your seed</h4>
          </div>
        </div>
        <div className="bg-base-100 w-full  rounded-md shadow-md shadow-2xl">
          {mnemonic && (
            <div className="mt-2  bg-base-100 p-4 rounded-lg text-white text-center grid grid-cols-6 gap-2  ">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-base-300  p-2 uppercase rounded-md shadow-md"
                >
                  {word}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MnemonicPage;
