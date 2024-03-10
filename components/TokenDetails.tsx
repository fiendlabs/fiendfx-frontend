import { HeadingTwo } from "@/components/HeadingTwo";
import DataCard from "@/components/DataCard";
import SingleGraph from "@/components/SingleGraph";
import { MintTokenObject } from "@/types";
import { formatCurrency } from "@/lib/utils";

type TokenDetailsProps = {
    readLoading: boolean,
    error: any,
    mintTokenObject: MintTokenObject,
    contractCollateralValueInUsd: string,
}

const TokenDetails = (
    { readLoading, error, mintTokenObject, contractCollateralValueInUsd }: TokenDetailsProps
) => {
  return (
    <div className="flex flex-col space-y-3">
      <HeadingTwo text={`Overview ${mintTokenObject?.symbol || ""}`} />
      <div className="gap-3 grid md:grid-cols-4  w-[500px]">
        <DataCard
          title="Rate"
          displayData={`10.00 WETH`}
          isLoading={readLoading}
          isError={!!error}
          error={error?.message || ""}
          subText="Per 1.00 DSC"
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
