import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import MnemonicPage from "./components/Mnemonic";
import SolWallet from "./components/SolWallet";
import EthWallet from "./components/EthWallet";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Route for the Hero component */}
        <Route path="/" element={<Hero />} />

        {/* Route for the MnemonicPage component */}
        <Route path="/mnemonic" element={<MnemonicPage />} />
        <Route path="/eth-wallet/:mnemonic" element={<EthWallet />} />
        <Route path="/sol-wallet/:mnemonic" element={<SolWallet />} />
      </Routes>
    </Router>
  );
};

export default App;

// <div className="base-100 base-content">
//   <Hero />
//   <MnemonicPage />
// </div>

// <div className="bg-dark-purple3 min-h-screen flex items-center justify-center">
//   <div className=" p-8 rounded-lg shadow-lg max-w-2xl w-full grid-cols-2">
//     <h1 className="text-3xl text-white font-bold mb-6 text-center">
//       Web Wallet Generator
//     </h1>
//     <button
//       className="bg-palatinate text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300"
//       onClick={createSeedPhrase}
//     >
//       Create Seed Phrase
//     </button>

//     {mnemonic && (
//       <>
//         <div className="mt-6 bg-dark-purple2 p-4 rounded-lg text-white grid grid-cols-6 gap-2">
//           {mnemonic.split(" ").map((word, index) => (
//             <div
//               key={index}
//               className="bg-dark-purple1 p-2 rounded-md shadow-md"
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//         <div className="mt-6">
//           <EthWallet
//             mnemonic={mnemonic}
//             reset={resetWallets}
//             setReset={setResetWallets}
//           />
//         </div>
//       </>
//     )}
//   </div>
//   <div className=" p-8 rounded-lg shadow-lg max-w-2xl w-full grid-cols-2">
//     <div className="mt-6">
//       <SolanaWallet
//         mnemonic={mnemonic}
//         reset={resetWallets}
//         setReset={setResetWallets}
//       />
//     </div>
//     <TransactionForm />
//   </div>
// </div>
