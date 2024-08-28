import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  const navigateToEthWallet = () => {
    navigate("/eth-wallet/:mnemonic");
  };

  const solHandle = () => {
    navigate("/sol-wallet/:mnemonic");
  };
  const seedpage = () => {
    navigate("/mnemonic"); // Navigate back in history
  };

  return (
    <div className="navbar text-black w-auto border-b-2 ">
      <div className="navbar-start">
        <button
          className="btn btn-ghost text-xl flex items-center  "
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
        {" "}
        <a className="btn btn-ghost  text-xl  " onClick={navigateToEthWallet}>
          Ethereum{" "}
        </a>
        <a className="btn btn-ghost text-xl " onClick={seedpage}>
          Seed Generator
        </a>
        <a className="btn btn-ghost text-xl   " onClick={solHandle}>
          Solana
        </a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Header;
