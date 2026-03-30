// "use client";

// import React from "react";
// import Button from "@/components/ui/button/Button";
// import { useWallet } from "@/context/WalletContext";

// const shortenAddress = (value: string) =>
//   `${value.slice(0, 6)}...${value.slice(-4)}`;

// export default function WalletConnectButton() {
//   const {
//     account,
//     connectWallet,
//     disconnectWallet,
//     isConnecting,
//     isCorrectNetwork,
//     switchNetwork,
//     targetChainName,
//   } = useWallet();

//   const handleClick = async () => {
//     if (!account) {
//       await connectWallet();
//       return;
//     }

//     if (!isCorrectNetwork) {
//       await switchNetwork();
//       return;
//     }

//     disconnectWallet();
//   };

//   const label = !account
//     ? isConnecting
//       ? "Connecting..."
//       : "Connect Wallet"
//     : !isCorrectNetwork
//       ? `Switch to ${targetChainName}`
//       : shortenAddress(account);

//   return (
//     <button
//       onClick={() => {
//         void handleClick();
//       }}
//       disabled={isConnecting}
//       className="bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-white font-bold py-3 px-6 rounded-[18px] transition-all min-w-[160px] shadow-[0_4px_20px_rgba(50,170,0,0.3)] active:scale-95"
//     >
//       {label}
//     </button>
//   );
// }
