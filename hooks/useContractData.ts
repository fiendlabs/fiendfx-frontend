import { useContractReads } from "wagmi";
import { DscContractAbi} from "@/lib/DscContractAbi";
import { WethAbi } from "@/lib/WethAbi";
import { TEST_ADDRESS, TEST_ENGINE_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { Abi } from "viem";



const useContractData = (mintTokenAddress: string, collateralTokenAddress: string, userAddress:string) => {
    const {
        data: contractReadData,
        isLoading: readLoading,
        error,
      } = useContractReads({
        contracts: [
          {
            address: mintTokenAddress as `0x${string}`,
            abi: WethAbi as Abi,
            functionName: "balanceOf",
            args: [userAddress],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getCollateralTokenPriceFeed",
            args: [TEST_WETH_ADDRESS],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getPrecision",
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getAdditionalFeedPrecision",
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getCollateralBalanceOfUser",
            args: [userAddress, TEST_WETH_ADDRESS],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getLiquidationThreshold",
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getHealthFactor",
            args: [userAddress],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getAccountInformation",
            args: [userAddress],
          },
          {
            address: collateralTokenAddress as `0x${string}`,
            abi: WethAbi as Abi,
            functionName: "balanceOf",
            args: [userAddress],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getCollateralBalanceOfUser",
            args: [userAddress, collateralTokenAddress],
          },
          {
            address: TEST_ENGINE_ADDRESS,
            abi: DscContractAbi as Abi,
            functionName: "getCollateralTokenPriceFeed",
            args: [collateralTokenAddress],
          },
        ],
      });

  // Additional logic to process contractReadData

  return { contractReadData, readLoading, error };
};

export default useContractData;
