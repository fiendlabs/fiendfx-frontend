import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { DscContractAbi } from "@/lib/DscContractAbi";
import { parseUnits } from "viem";

// Hook for redeeming tokens
const useRedeemToken = (engineAddress: string, tokenCollateralAddress: string, amountCollateral: number, amountDscToBurn: number, precision: number) => {
  // Convert amounts to BigNumber format
  const bigIntAmountCollateral = parseUnits(amountCollateral.toString(), precision); 
  const bigIntAmountDscToBurn = parseUnits(amountDscToBurn.toString(), precision);

  // Convert BigNumbers to formatted numbers
  const formattedAmountCollateral = Number(bigIntAmountCollateral.toString().replace('n', ''));
  const formattedAmountDscToBurn = Number(bigIntAmountDscToBurn.toString().replace('n', ''));

  console.log(`Preparing redeem contract write... with config:`, tokenCollateralAddress, formattedAmountCollateral, formattedAmountDscToBurn);

  // Prepare the contract write operation
  const { config, error: prepareError } = usePrepareContractWrite({
    address: engineAddress as `0x${string}`,
    abi: DscContractAbi,
    functionName: "redeemCollateralForDsc",
    args: [tokenCollateralAddress, formattedAmountCollateral, formattedAmountDscToBurn],
  });

  // Execute the contract write operation
  const { write, data: writeData, isLoading: writeLoading, error: writeError, isSuccess: writeSuccess } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Redeeming successful', data);
      // Additional success logic
    },
    onError(error) {
      console.error('Redeeming failed', error);
      // Additional error handling
    },
  });

  // Function to initiate the redeeming process
  const redeemToken = async () => {
    if (write) {
      await write();
    } else {
      console.error('Contract write is not ready.');
      // Handle the case where the contract write function is not ready
    }
  };

  return { redeemToken, writeData, writeLoading, writeError, prepareError, writeSuccess };
};

export default useRedeemToken;
