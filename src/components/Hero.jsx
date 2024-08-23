import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.png";

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
            className="btn btn-primary btn-square w-44 hover:bg-base-200"
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
