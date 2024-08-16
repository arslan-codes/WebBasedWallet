// src/TransactionForm.jsx

import { useState } from "react";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: "Cojj_FwYQcr0bGp1MlsIMdiCnoZffDcT", // Replace with your Alchemy API key
  network: Network.ETH_MAINNET,
});

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
);

const TransactionForm = () => {
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const handleSendTransaction = async () => {
    if (
      !ethers.utils.isAddress(senderAddress) ||
      !ethers.utils.isAddress(receiverAddress)
    ) {
      setError("Invalid sender or receiver address.");
      return;
    }

    try {
      const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider); // Replace with your sender's private key
      const tx = {
        to: receiverAddress,
        value: ethers.parseEther(amount),
      };
      const transactionResponse = await wallet.sendTransaction(tx);
      setTransactionHash(transactionResponse.hash);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-dark-purple2 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl text-white font-bold mb-4">Send Transaction</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Sender Address"
          className="p-2 rounded-md w-full"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver Address"
          className="p-2 rounded-md w-full"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount (ETH)"
          className="p-2 rounded-md w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-palatinate text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300"
          onClick={handleSendTransaction}
        >
          Send Transaction
        </button>
        {transactionHash && (
          <div className="mt-4 text-white">
            Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              {transactionHash}
            </a>
          </div>
        )}
        {error && <div className="mt-4 text-red-500">Error: {error}</div>}
      </div>
    </div>
  );
};

export default TransactionForm;
