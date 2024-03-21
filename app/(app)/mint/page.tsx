// This is the minting page for the stable coin. Deposit Eth and mint stable coin.
"use client";

import DepositForm from "@/components/DepositForm";
import EmptyResult from "@/components/EmptyResult";
import HeadingOne from "@/components/HeadingOne";
import TokenDetails from "@/components/TokenDetails";
import { toast } from "@/components/ui/use-toast";
import useContractData from "@/hooks/useContractData";
import useMintToken from "@/hooks/useMintToken";
import useProcessContractData, { ContractReadData } from "@/hooks/useProcessData";
import useQueryParams from "@/hooks/useQueryParams";
import { INPUT_TOKENS, MINT_TOKENS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { useAccount } from "wagmi";


const MintPage = () => {

    //  Get the token from the url
    const { getQueryParam, updateQueryParams } = useQueryParams();
    const queryToken = getQueryParam("token");
    const collateralToken = getQueryParam("collateral");
  
    const userAddress = useAccount();
    const address = userAddress.address as string;

    console.log(`wallet address: ${address}`)
  
    const mintTokenObject = MINT_TOKENS.find(
      (token) => token.symbol === queryToken
    );

  
    const collateralTokenObject = INPUT_TOKENS.find(
      (token) => token.symbol === collateralToken
    );
  
    const mintTokenAddress = mintTokenObject?.value || '0x0';
    const collateralTokenAddress =
      collateralTokenObject?.value || '0x0';
  
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
          updateQueryParams({ token }, "/mint?");
        }
  };

  const handleSetCollateral = (collateral: string) => {

        // Get and update the query token, even if there are other params
        if (collateral && collateral !== collateralToken) {
          updateQueryParams({ collateral }, "/mint?");
        }
  };




  return (
    <div className="m-3 space-y-3">
      <HeadingOne text="Mint 🍃" subText="Mint & borrow stable coins here" />
      <div className="flex gap-3">
        <DepositForm 
                  handleSetToken={handleSetToken}
                  handleSetCollateral={handleSetCollateral}
                  tokenAmount={availableBalance}
                  debtTokenSymbol={mintTokenObject?.symbol}
                  collateralAmount={collateralBalanceOfUser}
                  collateralTokenSymbol={collateralTokenObject?.symbol}
                  collateralInWallet={collateralBalance}
                  tokenEngine={mintTokenObject?.engine || '0x0'}
                  collateralTokenAddress={collateralTokenObject?.value || '0x0'}
                  precision={precision}
                  walletAddress={address}

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

export default MintPage;
