export const rewardDistributorAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "platform",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "bulkDistribute",
    outputs: [
      {
        internalType: "uint256",
        name: "distributionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "platformAmount",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;
