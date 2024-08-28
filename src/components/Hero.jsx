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
    <div className="hero bg-white min-h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
    </div>
  );
};

export default Hero;
