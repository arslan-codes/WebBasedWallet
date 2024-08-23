import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import { sendJsonRpcRequest } from "./utils/jsonRpc";

const apiKey = process.env.alchemy_api;

const alchemy = new Alchemy({
  apiKey: "Cojj_FwYQcr0bGp1MlsIMdiCnoZffDcT", // Replace with your Alchemy API key
  network: Network.ETH_MAINNET,
});

export const EthWallet = ({ mnemonic, reset, setReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (reset) {
      setAddresses([]);
      setCurrentIndex(0);
      setReset(false); // Reset the trigger
    }
  }, [reset, setReset]);

  const handleFetchBalance = async () => {
    try {
      setError(null);

      const result = await sendJsonRpcRequest(
        "https://eth-mainnet.g.alchemy.com/v2/Cojj_FwYQcr0bGp1MlsIMdiCnoZffDcT",
        "eth_getBalance",
        [address, "latest"]
      );

      const balanceInEth = parseInt(result, 16) / 1e18;
      setBalance(balanceInEth);
    } catch (error) {
      setError(error.message);
    }
  };

  const addWallet = async () => {
    try {
      setError(null);
      setLoading(true);

      const seed = await mnemonicToSeed(mnemonic);
      const hdNodeWallet = HDNodeWallet.fromSeed(seed);
      const child = hdNodeWallet.derivePath(`m/44'/60'/0'/0/${currentIndex}`);
      const wallet = new Wallet(child.privateKey);
      const address = wallet.address;

      setCurrentIndex(currentIndex + 1);
      setAddresses((prev) => [...prev, address]);
    } catch (error) {
      setError("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-purple2 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Ethereum Wallets</h2>

      <button
        onClick={addWallet}
        className="bg-palatinate text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300 mb-4"
        disabled={loading}
      >
        {loading ? "Adding Wallet..." : "Add ETH Wallet"}
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-2">
        {addresses.map((p, index) => (
          <div
            key={index}
            className="bg-dark-purple1 p-2 rounded-md shadow-md text-white"
          >
            <div>ETH Address: {p}</div>
          </div>
        ))}
      </div>
      <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Fetch Balance</h2>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Wallet Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="border border-gray-300 p-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-6">
          <button
            onClick={handleFetchBalance}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Fetch Balance
          </button>
        </div>

        {balance !== null && !isNaN(balance) ? (
          <div className="text-green-600 mt-4">
            Balance: {balance.toFixed(4)} ETH
          </div>
        ) : (
          <div className="text-red-600 mt-4"></div>
        )}

        {error && <div className="text-red-600 mt-4">Error: {error}</div>}
      </div>
    </div>
  );
};
