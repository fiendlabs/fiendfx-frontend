import { FieldValues, set } from "react-hook-form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronsUpDown, Check } from "lucide-react";
import { TokenObject } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

import { INPUT_TOKENS, MINT_TOKENS } from "@/lib/constants";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { use, useEffect, useMemo, useState } from "react";
import { toast } from "./ui/use-toast";
import useMintToken from "@/hooks/useMintToken";
import useApproveToken from "@/hooks/useApproveHook";

type DepositFormProps = {
  handleSetToken: (debtToken: string) => void;
  handleSetCollateral: (collateralToken: string) => void;
  tokenAmount: string;
  debtTokenSymbol: string | undefined;
  collateralAmount: string;
  collateralTokenSymbol: string | undefined;
  collateralInWallet: string;
  tokenEngine: string;
  collateralTokenAddress: string;
  precision: number;
  walletAddress: string;
};

const DepositForm = ({
  handleSetToken,
  handleSetCollateral,
  tokenAmount,
  debtTokenSymbol,
  collateralAmount,
  collateralTokenSymbol,
  collateralInWallet,
  tokenEngine,
  collateralTokenAddress,
  precision,
  walletAddress,
}: DepositFormProps) => {
  // state for minting and approving token
  const [isApproved, setIsApproved] = useState(false);

  // Form validation
  const FormSchema = z.object({
    collateralToken: z
      .string({
        required_error: "Collateral token is required",
      })
      .min(1),
    debtToken: z
      .string({
        required_error: "Debt token is required",
      })
      .min(1),
    debtAmountToMint: z
      .number({
        required_error: "Amount to mint is required",
        invalid_type_error: "Amount to mint must be a number greater than 0",
      })
      .positive(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      collateralToken: collateralTokenSymbol,
      debtToken: debtTokenSymbol,
      debtAmountToMint: 0,
    },
  });

  type RenderFormFieldProps = {
    field: any;
    // formValue should be one of the FormValues
    formValue: "debtToken" | "collateralToken" | "debtAmountToMint";
    label: string;
    tokens: TokenObject[];
    searchBoxWidth: string;
  };

  const RenderFormField = <TFieldValues extends FieldValues>({
    field,
    formValue,
    label,
    tokens,
    searchBoxWidth,
  }: RenderFormFieldProps) => {
    return (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-between",
                  searchBoxWidth,
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? tokens.find((token) => token.symbol === field.value)?.label
                  : "Select Token"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className={cn(searchBoxWidth, "p-0")}>
            {/* Here you would render your Command group and items */}
            <Command>
              <CommandInput placeholder="Search tokens..." />
              <CommandEmpty>No tokens found.</CommandEmpty>
              <CommandGroup>
                {tokens.map((token) => (
                  <CommandItem
                    value={token.label}
                    key={token.value}
                    onSelect={() => {
                      form.setValue(formValue, token.symbol);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        token.symbol === field.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {token.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    );
  };

  type RenderFormItemProps = {
    label: string;
    description: string;
  };

  const RenderFormItem = ({ label, description }: RenderFormItemProps) => {
    return (
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <div className="flex flex-col h-full justify-center">
          <FormDescription>{description}</FormDescription>
        </div>
      </FormItem>
    );
  };

  const selectedDebtToken = form.watch("debtToken");
  const selectedCollateralToken = form.watch("collateralToken");
  const selectedDebtAmountToMint = form.watch("debtAmountToMint");
  const amountToMint = selectedDebtAmountToMint || 0;
  const amountToDeposit = amountToMint * 10 || 0;

  console.log(`amountToMint: ${amountToMint}, amountToDeposit: ${amountToDeposit}`)

  // Inside DepositForm component
  useEffect(() => {
    handleSetToken(selectedDebtToken);
    handleSetCollateral(selectedCollateralToken);
  }, [
    selectedDebtToken,
    selectedCollateralToken,
    handleSetToken,
    handleSetCollateral,
  ]);

//   handle and useApprove Hook here

console.log(`collateralTokenAddress: ${collateralTokenAddress}, walletAddress: ${walletAddress}, amountToDeposit: ${amountToDeposit}, precision: ${precision}`)

const {
    approveToken,
    approveData,
    approveIsLoading,
    approveError,
    approvePrepareError,
    approveIsSuccess,
} = useApproveToken(collateralTokenAddress, walletAddress, amountToDeposit, precision)


console.log(`approveIsLoading: ${approveIsLoading}, approveError: ${approveError}, approveData: ${approveData}, approvePrepareError: ${approvePrepareError}, approveIsSuccess: ${approveIsSuccess}`)

// Notifications for approving token
useEffect(() => {
    if (approveError) {
        toast({
            variant: "destructive",
            title: "Error in Approving Token",
            description: approveError.message,
        });
    }
}
, [approveError]);

useEffect(() => {
    if (approveData && approveIsSuccess) {
        toast({
            title: "Token Approved Successfully",
            description: `Transaction Hash: ${approveData.hash}`,
        });

        setIsApproved(true);
    }
}
, [approveData, approveIsSuccess]);

useEffect(() => {
    if (approveIsLoading) {
        toast({
            title: "Transaction in Progress",
            description: "Approving token, please wait...",
        });
    }
}
, [approveIsLoading]);

const handleApprove = async () => {
    console.log(`handleApprove: ${amountToDeposit}`)
    if (amountToDeposit <= 0) {
        toast({
            variant: "destructive",
            title: "There was an error approving the token",
            description: "You must approve an amount greater than 0",
        });
        return;
    }
    await approveToken();
}



  //   call useMintToken here hook here

  const {
    mintToken,
    writeData,
    writeLoading,
    writeError,
    prepareError,
    writeSuccess,
  } = useMintToken(
    tokenEngine,
    collateralTokenAddress,
    amountToDeposit,
    amountToMint,
    precision
  );

//   console.log(
//     `writeLoading: ${writeLoading} , writeError: ${writeError} , writeSuccess: ${writeSuccess}, writeData: ${writeData}, prepareError: ${prepareError}, amountToDeposit: ${amountToDeposit}, amountToMint: ${amountToMint}`
//   );

  // Notifications for minting token

  useEffect(() => {
    if (writeError) {
      toast({
        variant: "destructive",
        title: "Error in Minting Token",
        description: writeError.message,
      });
    }
  }, [writeError]);

  useEffect(() => {
    if (writeData && writeSuccess) {
      toast({
        title: "Token Minted Successfully",
        description: `Transaction Hash: ${writeData.hash}`,
      });
    }
  }, [writeData, writeSuccess]);

  useEffect(() => {
    if (writeLoading) {
      toast({
        title: "Transaction in Progress",
        description: "Minting token, please wait...",
      });
    }
  }, [writeLoading]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    if (amountToDeposit > parseFloat(collateralInWallet)) {
      toast({
        variant: "destructive",
        title: "There was an error minting the token",
        description: "You don't have enough collateral to deposit",
      });
      return;
    }

    await mintToken();
  };

  return (
    // Will add once we correct render form field
    <Card className="w-[550px]">
      <CardHeader>
        <CardDescription>
          Select token to mint and collateral to deposit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Select the token to mint here */}
            <div className="flex gap-3 justify-between">
              {/* Render form field */}
              <FormField
                name="debtToken"
                control={form.control}
                render={({ field }) => (
                  <RenderFormField
                    field={field}
                    formValue="debtToken"
                    label="Mint"
                    tokens={MINT_TOKENS} // You should pass the actual token list here
                    searchBoxWidth="w-[300px]"
                  />
                )}
              />
              {/* Render form item */}
              <RenderFormItem
                label="Symbol"
                description={debtTokenSymbol || ""}
              />
              <RenderFormItem
                label="Amount Held"
                description={tokenAmount || ""}
              />
            </div>
            {/* Select the collateral token here */}

            <Separator className="my-4" />

            <div className="flex gap-3 justify-between">
              {/* Render form field */}
              <FormField
                name="collateralToken"
                control={form.control}
                render={({ field }) => (
                  <RenderFormField
                    field={field}
                    formValue="collateralToken"
                    label="Collateral"
                    tokens={INPUT_TOKENS} // You should pass the actual token list here
                    searchBoxWidth="w-[300px]"
                  />
                )}
              />
              {/* Render form item */}
              <RenderFormItem
                label="Symbol"
                description={collateralTokenSymbol || ""}
              />
              <RenderFormItem
                label="Amount Held"
                description={collateralInWallet}
              />
            </div>

            {/* Input amount of minted tokens to mint */}
            <FormField
              control={form.control}
              name="debtAmountToMint"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Amount to Mint</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="input-field-class"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Display Calculated Output Amount */}
            <div className="flex h-full bg-muted rounded-md items-center justify-between p-2">
              <h4 className="text-sm font-medium leading-none ">Deposit</h4>
              <CardDescription className="text-base text-green-500 font-bold">
                {" "}
                {amountToDeposit || 0} {selectedCollateralToken}
              </CardDescription>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
                {/* You must approve a transaction before submitting */}
                You must approve a transaction before submitting
                </CardDescription>
            <div className="space-x-3">
            <Button
            type="button"
                variant={isApproved ? "ghost" : "default"}
                disabled={isApproved ? true : false}
                onClick={handleApprove}
              >
                {isApproved ? "Approved 👍🏽" : "Approve"}
              </Button>
              <Button type="submit" disabled={isApproved ? false : true}>
                Submit
              </Button>

            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DepositForm;
