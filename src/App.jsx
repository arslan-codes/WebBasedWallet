import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "./eth";
import { SolanaWallet } from "./sol";
import TransactionForm from "./transaction";
const App = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [resetWallets, setResetWallets] = useState(false);

  const createSeedPhrase = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
    setResetWallets(true); // Trigger the reset of wallets
  };

  return (
    <div className="bg-dark-purple3 min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-lg max-w-2xl w-full grid-cols-2">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Web Wallet Generator
        </h1>
        <button
          className="bg-palatinate text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300"
          onClick={createSeedPhrase}
        >
          Create Seed Phrase
        </button>

        {mnemonic && (
          <>
            <div className="mt-6 bg-dark-purple2 p-4 rounded-lg text-white grid grid-cols-6 gap-2">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-dark-purple1 p-2 rounded-md shadow-md"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <EthWallet
                mnemonic={mnemonic}
                reset={resetWallets}
                setReset={setResetWallets}
              />
            </div>
            <div className="mt-6">
              <SolanaWallet
                mnemonic={mnemonic}
                reset={resetWallets}
                setReset={setResetWallets}
              />
            </div>
          </>
        )}
      </div>
      <div className=" p-8 rounded-lg shadow-lg max-w-2xl w-full grid-cols-2">
        <TransactionForm />
      </div>
    </div>
  );
};

export default App;
