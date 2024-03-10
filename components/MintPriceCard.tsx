import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DscContractAbi } from "@/lib/DscContractAbi";
import { TEST_DSCE_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { Abi } from "viem";
import { useAccount, useContractReads } from "wagmi";
import { Skeleton } from "./ui/skeleton";

const MintPriceCard = () => {
  const userAddress = useAccount();
  console.log("userAddress", userAddress);

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
    ],
  });

  console.log("getUsdValue", data);

  const renderResult = () => {
    if (isSuccess) {
      const price = data?.[0].result as bigint;
      const precision = data?.[1].result as bigint;
      const additionalFeedPrecision = data?.[2].result as bigint;

      const displayPrice = price / precision ;

      return (
        <CardContent>
          <div className="text-2xl font-bold">
            ${displayPrice.toString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Per deposited token
          </p>
        </CardContent>
      );
    }

    if (isLoading) {
      return <Skeleton className="h-[50%] w-[90%] mx-3" />;
    }

    if (isError) {
      return <div>Error: {data?.[0].error?.message}</div>;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Price</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      {renderResult()}
    </Card>
  );
};

export default MintPriceCard;
