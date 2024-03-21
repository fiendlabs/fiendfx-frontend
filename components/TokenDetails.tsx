import { HeadingTwo } from "@/components/HeadingTwo";
import DataCard from "@/components/DataCard";
import SingleGraph from "@/components/SingleGraph";
import { MintTokenObject } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { symbol } from "zod";

type TokenDetailsProps = {
    readLoading: boolean,
    error: any,
    mintTokenObject: MintTokenObject,
    contractCollateralValueInUsd: string,
}

// TODO: DataCard needs to get the actual rate not hard coded values

const GetRate = (tokenSymbol: string, collateral: string = 'WETH') => {

  const rates: { [key: string]: number } = {
    WETH: 10.00,
    USDC: 1.00,
    DAI: 1.00,
    USDT: 1.00,
  };

  const rate = rates[collateral] || 1.00;

  return rate;

}

const TokenDetails = (
    { readLoading, error, mintTokenObject, contractCollateralValueInUsd }: TokenDetailsProps
) => {
  const collateral = "WETH";
  const rate = GetRate(mintTokenObject.symbol, collateral);

  return (
    <div className="flex flex-col space-y-3">
      <HeadingTwo text={`Overview ${mintTokenObject?.symbol || ""}`} />
      <div className="gap-3 grid md:grid-cols-4  w-[500px]">
    
        <DataCard
          title="Rate"
          displayData={`${rate} ${collateral}`}
          isLoading={readLoading}
          isError={!!error}
          error={error?.message || ""}
          subText={`Per 1.00 ${mintTokenObject?.symbol || ""}`}
        />
        <DataCard
          title="Value"
          displayData={
            `$ ` + formatCurrency(Number(contractCollateralValueInUsd))
          }
          isLoading={readLoading}
          isError={!!error}
          error={error?.message || ""}
          subText="Locked in USD"
        />
      </div>
      <SingleGraph
        title="History"
        currentValue="$15,231.89"
        valueDescription="+20.1% from last month"
      />
    </div>
  );
};

export default TokenDetails;
