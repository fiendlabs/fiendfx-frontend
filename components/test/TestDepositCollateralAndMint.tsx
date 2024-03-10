"use client";

import { DscContractAbi } from "@/lib/DscContractAbi";
import { TEST_DSCE_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { parseUnits } from "viem/utils";
import { useContractWrite } from "wagmi";

// Make sure to approve the deposit amout of WETH to the DSCE contract before calling this function.
// Otherwise, the transaction will fail.

const TestDepositCollateralAndMint = () => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: TEST_DSCE_ADDRESS,
    abi: DscContractAbi,
    functionName: "depositCollateralAndMintDsc",
    args: [
      TEST_WETH_ADDRESS,
      100000000000000000,
      10000000000000000,
    ],
  });

  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => write()}
      >
        Deposit Collateral And Mint
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default TestDepositCollateralAndMint;
