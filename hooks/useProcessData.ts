import { formatUnits } from "viem";

export type ContractReadData = {
    [key: string]: any;
  };
  
const useProcessContractData = (contractReadData:ContractReadData ) => {
  
    const rawPrecision = contractReadData?.[2].result as bigint;
    const precision = rawPrecision ? formatUnits(rawPrecision, 1).length : 0;
  
    const rawAdditionalFeedPrecision = contractReadData?.[3].result as bigint;
    const additionalFeedPrecision = rawAdditionalFeedPrecision
      ? formatUnits(rawAdditionalFeedPrecision, 1).length
      : 0;
  
    const rawBalance = contractReadData?.[0].result as bigint;
    const availableBalance = rawBalance
      ? formatUnits(rawBalance, precision)
      : "0";
  
    const rawCollateralBalance = contractReadData?.[8].result as bigint;
    const collateralBalance = rawCollateralBalance
      ? formatUnits(rawCollateralBalance, precision)
      : "0";
  
    const rawAccountInformation = contractReadData?.[7].result as [
      bigint,
      bigint
    ];
    const rawMintedTokenBalance = rawAccountInformation?.[0] as bigint;
    const rawCollateralValueInUsd = rawAccountInformation?.[1] as bigint;
  
    const contractMintedTokenBalance = rawMintedTokenBalance
      ? formatUnits(rawMintedTokenBalance, precision)
      : "0";
    const contractCollateralValueInUsd = rawCollateralValueInUsd
      ? formatUnits(rawCollateralValueInUsd, precision)
      : "0";
  
    // how much collateral the user has locked up in it's native amount (not usd)
    const rawCollateralBalanceOfUser = contractReadData?.[9].result as bigint;
    const collateralBalanceOfUser = rawCollateralBalanceOfUser
      ? formatUnits(rawCollateralBalanceOfUser, precision)
      : "0";
  
      return {
        precision,
        additionalFeedPrecision,
        availableBalance,
        collateralBalance,
        collateralBalanceOfUser,
        contractMintedTokenBalance,
        contractCollateralValueInUsd,
      };
  }

export default useProcessContractData;
  
  