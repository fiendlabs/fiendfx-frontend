import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { WethAbi } from "@/lib/WethAbi"; // This is the ABI for the WETH token
import { parseUnits } from "viem";

const useApproveToken = (
  tokenAddress: string,
  spenderAddress: string,
  amount: number,
  precision: number,
) => {

// convert the amount to a bigInt
    const bigIntAmount = parseUnits(amount.toString(), precision);
    const formattedAmount = Number(bigIntAmount.toString().replace('n', ''));
  // Prepare the contract write operation
  const { config, error: approvePrepareError } = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: WethAbi,
    functionName: "approve",
    args: [spenderAddress, formattedAmount],
  });

  console.log(`Preparing contract approve... with config:`, tokenAddress, spenderAddress, formattedAmount);

  const {
    write,
    data: approveData,
    isLoading: approveIsLoading,
    error: approveError,
    isSuccess: approveIsSuccess,
  } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log("Minting successful", data);
      // Additional success logic
    },
    onError(error) {
      console.error("Minting failed", error);
      // Additional error handling
    },
  });

  const approveToken = async () => {
    try {
      if (write) {
        await write();
      } else {
        console.error("Contract write is not ready.");
      }
    } catch (error) {
      console.error("Approve token failed", error);
    }
  };

  return {
    approveToken,
    approveData,
    approveIsLoading,
    approveError,
    approvePrepareError,
    approveIsSuccess,
  };
};

export default useApproveToken;
