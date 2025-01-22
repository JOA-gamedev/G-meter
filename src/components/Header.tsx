"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Header() {
  const wallet = useWallet();

  return (
    <header className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">G-Meter Dashboard</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/leaderboard" className="hover:text-blue-400">
                Leaderboard
              </a>
            </li>
            <li>
              <WalletMultiButtonDynamic>
                {wallet.publicKey
                  ? `${wallet.publicKey.toBase58().substring(0, 7)}...`
                  : "Connect Wallet"}
              </WalletMultiButtonDynamic>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
