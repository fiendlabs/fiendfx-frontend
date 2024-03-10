import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { DscContractAbi } from "@/lib/DscContractAbi";
import { parseUnits } from "viem";

// Hook for minting tokens
const useMintToken = (engineAddress:string, tokenCollateralAddress: string, amountCollateral: number, amountDscToMint: number, precision: number) => {
  // Convert string amounts to BigNumber format required by the smart contract
  const bigIntAmountCollateral = parseUnits(amountCollateral.toString(), precision); // assuming 18 decimals for the collateral token
  const bigIntAmountDscToMint = parseUnits(amountDscToMint.toString(), precision);
    // assuming 18 decimals for the minted token
    //Change the bigints to strings, remove the 'n' and then convert to a number
    const formattedAmountCollateral = Number(bigIntAmountCollateral.toString().replace('n', ''));
    const formattedAmountDscToMint = Number(bigIntAmountDscToMint.toString().replace('n', ''));


  
  // Prepare the contract write operation
  const { config, error: prepareError } = usePrepareContractWrite({
    address: engineAddress as `0x${string}`,
    abi: DscContractAbi,
    functionName: "depositCollateralAndMintDsc",
    args: [tokenCollateralAddress, formattedAmountCollateral , formattedAmountDscToMint],
  });

  // Execute the contract write operation

  console.log(`Preparing contract write... with config:`, tokenCollateralAddress, formattedAmountCollateral, formattedAmountDscToMint);
  const { write, data: writeData, isLoading: writeLoading, error: writeError, isSuccess: writeSuccess } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Minting successful', data);
      // Additional success logic
    },
    onError(error) {
      console.error('Minting failed', error);
      // Additional error handling
    },
  });

  if(writeLoading) console.log('Loading Contract...'); 

  // Function to initiate the minting process
  const mintToken = async () => {

    if (write) {
      await write();
    } else {
      console.error('Contract write is not ready.');
      console.log(`Current state is:`, writeData, writeLoading, writeError, writeSuccess);
      // Handle the case where the contract write function is not ready


    }
  };

  return { mintToken, writeData, writeLoading, writeError, prepareError, writeSuccess };
};

export default useMintToken;
