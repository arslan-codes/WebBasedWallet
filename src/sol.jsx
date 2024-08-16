import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic, reset, setReset }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    if (reset) {
      setPublicKeys([]);
      setBalances({});
      setCurrentIndex(0);
      setReset(false); // Reset the trigger
    }
  }, [reset, setReset]);

  const fetchBalance = async (publicKey) => {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  };

  const addWallet = async () => {
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const publicKey = keypair.publicKey.toBase58();
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, publicKey]);

    const balance = await fetchBalance(publicKey);
    setBalances((prev) => ({ ...prev, [publicKey]: balance }));
  };

  return (
    <div className="bg-dark-purple2 p-4 rounded-lg shadow-lg">
      <button
        className="bg-palatinate text-white w-full py-3 rounded-lg hover:bg-dark-purple1 transition duration-300 mb-4"
        onClick={addWallet}
      >
        Add SOL Wallet
      </button>
      <div className="space-y-2">
        {publicKeys.map((p, index) => (
          <div
            key={index}
            className="bg-dark-purple1 text-white p-2 rounded-md shadow-md mb-2"
          >
            SOL - {p} <br />
            Balance:{" "}
            {balances[p] !== undefined ? `${balances[p]} SOL` : "Loading..."}
          </div>
        ))}
      </div>
    </div>
  );
}
