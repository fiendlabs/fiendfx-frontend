import { HeadingTwo } from "@/components/HeadingTwo";
import { Deposit } from "@/types";
import depositColumns from "@/components/deposits/DepositsColumns";
import DataTable from "@/components/transactions/data-table";
import { useAccount, useContractReads } from "wagmi";
import { TEST_ADDRESS, TEST_DSCE_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { DscContractAbi } from "@/lib/DscContractAbi";
import { Abi, formatUnits } from "viem";

const deposits: Deposit[] = [
  {
    id: "1",
    asset: "ETH",
    amount: 1,
    value: 1,
  },
];

const MintDeposits = () => {
  const userAddress = useAccount();
  const addresss = userAddress.address as string;

  const { data, isError, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        address: TEST_DSCE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: "getAccountInformation",
        args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
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

  console.log("data", data);

  type CustomResult = [bigint, bigint];
  let assetValue = 0;
  let usdValue = 0;

  const accountInformation = data?.[0].result as CustomResult;
  const precision = data?.[1].result as bigint;
  const additionalFeedPrecision = data?.[2].result as bigint;

  console.log("accountInformation", accountInformation);
  console.log("precision", precision);
  console.log("additionalFeedPrecision", additionalFeedPrecision);

  if (!isLoading && data) {
    const formattedPrecision  = formatUnits(precision, 1).length;
    const formattedAdditionalFeedPrecision = formatUnits(additionalFeedPrecision, 1).length;

    assetValue = Number(formatUnits(accountInformation[0] / precision, formattedPrecision));
    usdValue = Number(formatUnits(accountInformation[1] / additionalFeedPrecision, formattedAdditionalFeedPrecision));
    console.log("assetValue", assetValue);
    console.log("usdValue", usdValue);

    deposits[0].amount = assetValue;
    deposits[0].value = usdValue;
    deposits[0].asset = "WETH";
  }

  return (
    <div>
      <HeadingTwo text="Deposits" />
      <div className=" mx-auto py-5">
        <DataTable columns={depositColumns} data={deposits} />
      </div>
    </div>
  );
};

export default MintDeposits;
