import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/dazzle-line-online-banking.gif";
import cryptoMan from "../assets/hero-image3.png";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/mnemonic"); // Navigate to the "/mnemonic" path
  };

  return (
    <div className="hero bg-warning min-h-screen">
      <div className="hero-content flex-col lg:flex-row w-full justify-between">
        <div className="lg:text-left">
          <h1 className="text-8xl font-bold">Crypto Web Wallet</h1>
          <p className="py-6">
            A crypto wallet generated with advanced Hashing and Cryptographic
            Techniques
          </p>
          <button
            className="btn bg-base-300 text-white border-0 btn-square w-44 hover:bg-black"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
        <div>
          <img src={heroImage} alt="Crypto Web Wallet" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
