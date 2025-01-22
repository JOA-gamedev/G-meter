"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function home() {
  const wallet = useWallet();
  return (
    <h1>
      {wallet.publicKey ? `${wallet.publicKey.toBase58()}` : "Connect Wallet"}
    </h1>
  );
}
