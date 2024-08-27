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
        <Route path="/" element={<Hero />} />
        <Route path="/mnemonic" element={<MnemonicPage />} />
        <Route path="/eth-wallet/:mnemonic" element={<EthWallet />} />
        <Route path="/sol-wallet/:mnemonic" element={<SolWallet />} />
      </Routes>
    </Router>
  );
};

export default App;
