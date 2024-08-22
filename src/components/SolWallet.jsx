import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SolWallet = () => {
  const { mnemonic } = useParams(); // Get mnemonic from URL params
  const navigate = useNavigate(); // Use parentheses to call the hook

  const goBack = () => {
    navigate(-1); // Navigate back in history
  };
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="navbar shadow-lg shadow-base-100 ">
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

      <div className="content">
        <p>Your mnemonic: {mnemonic}</p>
      </div>
    </div>
  );
};

export default SolWallet;
