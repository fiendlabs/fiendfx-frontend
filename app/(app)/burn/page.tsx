"use client";
import { useAccount } from "wagmi";
import useContractData from "@/hooks/useContractData";
import useProcessContractData, {
  ContractReadData,
} from "@/hooks/useProcessData";
import useQueryParams from "@/hooks/useQueryParams";
import EmptyResult from "@/components/EmptyResult";
import HeadingOne from "@/components/HeadingOne";
import TokenDetails from "@/components/TokenDetails";
import WithdrawForm from "@/components/WithdrawForm";
import { INPUT_TOKENS, MINT_TOKENS, TEST_WETH_ADDRESS } from "@/lib/constants";

const BurnPage = () => {
  //  Get the token from the url
  const { getQueryParam, updateQueryParams } = useQueryParams();
  const queryToken = getQueryParam("token");
  const collateralToken = getQueryParam("collateral");

  const userAddress = useAccount();
  const address = userAddress.address as string;

  const mintTokenObject = MINT_TOKENS.find(
    (token) => token.symbol === queryToken
  );

  const collateralTokenObject = INPUT_TOKENS.find(
    (token) => token.symbol === collateralToken
  );

  const mintTokenAddress = mintTokenObject?.value || TEST_WETH_ADDRESS;
  const collateralTokenAddress =
    collateralTokenObject?.value || TEST_WETH_ADDRESS;

  // Read values from the smart contract
  const { contractReadData, readLoading, error } = useContractData(
    mintTokenAddress,
    collateralTokenAddress,
    address
  );

  const {
    precision,
    additionalFeedPrecision,
    availableBalance,
    collateralBalance,
    collateralBalanceOfUser,
    contractMintedTokenBalance,
    contractCollateralValueInUsd,
  } = useProcessContractData(contractReadData as ContractReadData);

  const handleSetToken = (token: string) => {
    // Get and update the query token, even if there are other params
    if (token && token !== queryToken) {
      updateQueryParams({ token });
    }
  };

  const handleSetCollateral = (collateral: string) => {
    // Get and update the query token, even if there are other params
    if (collateral && collateral !== collateralToken) {
      updateQueryParams({ collateral });
    }
  };

  return (
    <div className="m-3 space-y-3">
      <HeadingOne
        text="Burn 🔥"
        subText="Withdraw collateral by burning minted tokens"
      />
      <div className="flex flex-row gap-3">
        <WithdrawForm
          handleSetToken={handleSetToken}
          handleSetCollateral={handleSetCollateral}
          tokenAmount={Number(availableBalance)}
          collateralAmount={collateralBalanceOfUser}
          collateralInWallet={collateralBalance}
          collateralTokenAddress={collateralTokenAddress}
          tokenEngine={mintTokenObject?.engine || "0x0"}
          precision={precision}
        />

        {!mintTokenObject ? (
          <div className="w-[500px]">
            <EmptyResult
              text="No token selected"
              subText="View token details once burn token is selected"
            />
          </div>
        ) : (
          <TokenDetails
            readLoading={readLoading}
            error={error}
            mintTokenObject={mintTokenObject}
            contractCollateralValueInUsd={contractCollateralValueInUsd}
          />
        )}
      </div>
    </div>
  );
};

export default BurnPage;
