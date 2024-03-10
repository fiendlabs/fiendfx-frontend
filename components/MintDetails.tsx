import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MintPriceCard from "@/components/MintPriceCard";
import { useAccount, useContractReads } from "wagmi";
import { TEST_DSCE_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { DscContractAbi } from "@/lib/DscContractAbi";
import { Abi, formatUnits } from "viem";
import DataCard from "@/components/DataCard";
import { HeadingTwo } from "./HeadingTwo";


const formatCurrency = (value: number, currency = 'USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2, // This will round the number to 2 decimal places
    });
  
    return formatter.format(value);
  };

const formatNumber = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2, // This will round the number to 2 decimal places
    });
  
    return formatter.format(value);
  }

const MintDetails = () => {
  const userAddress = useAccount();
  console.log("userAddress", userAddress);
  const addresss = userAddress.address as string;


  const { data, isError, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getUsdValue",
        args: [TEST_WETH_ADDRESS, 1000000000000000000],
      },
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getPrecision",
      },
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getAdditionalFeedPrecision",
      },
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getCollateralBalanceOfUser",
        args: [addresss, TEST_WETH_ADDRESS],
      },
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getLiquidationThreshold",
      },
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getHealthFactor",
        args: [addresss],
      }
    ],
  });


  let displayPrice = null;
  let errorPrice = "";
  let displayCollateralBalance = null;
    let errorCollateralBalance = "";
    let displayLiquidationThreshold = null;
    let errorLiquidationThreshold = "";
    let displayHealthFactor = null;
    let errorHealthFactor = "";

  if (!isLoading && data) {

    // console.log("data", data);

    const price = data?.[0].result as bigint;
    const precision = data?.[1].result as bigint;
    const additionalFeedPrecision = data?.[2].result as bigint;
    const collateralBalance = data?.[3].result as bigint;
    const liquidationThreshold = data?.[4].result as bigint;
    const healthFactor = data?.[5].result as bigint;

    // console.log("price", price);
    // console.log("precision", precision);
    // console.log("additionalFeedPrecision", additionalFeedPrecision);
    // console.log("collateralBalance", collateralBalance);
    // console.log("liquidationThreshold", liquidationThreshold);
    // console.log("healthFactor", healthFactor);


    // Format the units
    const formattedPrecision  = formatUnits(precision, 1).length;


    displayPrice = formatCurrency(Number(formatUnits(price, formattedPrecision)));
    errorPrice = data?.[0].error?.message || "";

    displayCollateralBalance = 'WETH ' + formatNumber(Number(formatUnits(collateralBalance, formattedPrecision)));
    errorCollateralBalance = data?.[3].error?.message || "";

    // show liquidation threshold as a percentage (e.g. 0.5 = 50%)
    displayLiquidationThreshold = (100 / (Number(formatUnits(liquidationThreshold, 0)) /100) ).toString() + "%";


    errorLiquidationThreshold = data?.[4].error?.message || "";

    displayHealthFactor = formatNumber(Number(formatUnits(healthFactor, formattedPrecision)));
    errorHealthFactor = data?.[5].error?.message || "";
    
  }


  return (
    <div className="space-y-6">
    <HeadingTwo text="Overview" />
    <div className="gap-3 grid md:grid-cols-4 h-1/2 w-[500px]">
      <DataCard
        title="Price"
        displayData={displayPrice}
        isLoading={isLoading}
        isError={isError}
        error={errorPrice}
        subText="Per desposited token"
      />

        <DataCard
            title="Collateral Deposited"
            displayData={displayCollateralBalance}
            isLoading={isLoading}
            isError={isError}
            error={errorCollateralBalance}
            subText="In WETH"
        />

        <DataCard
            title="Liquidation Threshold"
            displayData={displayLiquidationThreshold}
            isLoading={isLoading}
            isError={isError}
            error={errorLiquidationThreshold}
            subText={`Minium to avoid liquidation`}
        />

        <DataCard
            title="Health Factor"
            displayData={displayHealthFactor}
            isLoading={isLoading}
            isError={isError}
            error={errorHealthFactor}
            subText={`Increase collateral to improve`}
        />
    </div>
    </div>
  );
};

export default MintDetails;
