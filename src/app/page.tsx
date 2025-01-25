"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Gauge from "@/components/Gauge";

export default function Home() {
  const wallet = useWallet();
  const [gScore, setGScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGScore = async () => {
    if (!wallet.publicKey) return; // Ensure the wallet is connected

    setLoading(true);
    try {
      const response = await fetch("/api/get-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: wallet.publicKey.toBase58() }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setGScore(data.gScore); // Set the G-Score
    } catch (error) {
      console.error("Failed to fetch G-Score:", error);
      alert("An error occurred while fetching your G-Score.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">
        Your public wallet key:
        {wallet.publicKey
          ? ` ${wallet.publicKey.toBase58()}`
          : " Connect Wallet"}
      </h1>

      {wallet.publicKey ? (
        <div className="mt-6">
          {gScore === null ? (
            <button
              onClick={fetchGScore}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Fetching G-Score..." : "Get My G-Score"}
            </button>
          ) : (
            <div className="mt-4 flex flex-col items-center">
              <Gauge
                value={gScore}
                max={100}
                size={400}
                strokeWidth={20}
                startColor="#00bbff"
              />
              <p className="mt-4 text-lg font-semibold">
                Your G-Score: {gScore}/100
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400">
          Please connect your wallet to get your G-Score.
        </p>
      )}
    </div>
  );
}
