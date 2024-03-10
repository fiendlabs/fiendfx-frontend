"use client";

import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { INPUT_TOKENS, MINT_TOKENS } from "@/lib/constants";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import useRedeemToken from "@/hooks/useRedeemToken";
import { use, useEffect } from "react";
import { toast } from "./ui/use-toast";

type WithdrawFormProps = {
  handleSetToken: (debtToken: string) => void;
  handleSetCollateral: (collateralToken: string) => void;
  tokenAmount: number;
  collateralAmount: string;
  collateralInWallet: string;
  collateralTokenAddress: string;
  tokenEngine: string;
  precision: number;
};

const searchBoxWidth = "w-[300px]";

const WithdrawForm = ({
  handleSetToken,
  handleSetCollateral,
  tokenAmount,
  collateralAmount,
  collateralInWallet,
  collateralTokenAddress,
  tokenEngine,
  precision,
}: WithdrawFormProps) => {
  const FormSchema = z.object({
    collateralToken: z.string({
      required_error: "Collateral token is required",
    }),
    debtToken: z.string({
      required_error: "Debt token is required",
    }),
    debtAmountToBurn: z
      .number({
        required_error: "Amount to burn is required",
        invalid_type_error:
          "Amount to burn must be less than available balance",
      })
      .positive()
      .max(Number(tokenAmount)),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      debtAmountToBurn: 0,
    },
  });

  const selectedDebtToken = form.watch("debtToken");
  const selectedCollateralToken = form.watch("collateralToken");
  const selectedTokenAmountToBurn = form.watch("debtAmountToBurn");
  const amountTokenToBurn = selectedTokenAmountToBurn || 0;
  const amountCollateralToRedeem = amountTokenToBurn / 10 || 0;
  handleSetToken(selectedDebtToken);
  handleSetCollateral(selectedCollateralToken);

  console.log(`tokenEngine: ${tokenEngine} collateralTokenAddress: ${collateralTokenAddress} amountCollateralToRedeem: ${amountCollateralToRedeem} amountTokenToBurn: ${amountTokenToBurn} precision: ${precision}`);

  const {
    redeemToken,
    writeData,
    writeLoading,
    writeError,
    prepareError,
    writeSuccess,
  } = useRedeemToken(
    tokenEngine,
    collateralTokenAddress,
    amountCollateralToRedeem,
    amountTokenToBurn,
    precision
  );

  console.log(
    `writeData: ${writeData} writeLoading: ${writeLoading} writeError: ${writeError} prepareError: ${prepareError} writeSuccess: ${writeSuccess}`
  );

  // Notifications for withdrawing and burning tokens
  useEffect(() => {
    if (writeError) {
      toast({
        variant: "destructive",
        title: "Error in redeeming the Token",
        description: writeError.message,
      });
    }
  }, [writeError]);

  useEffect(() => {
    if (writeData && writeSuccess) {
      toast({
        title: "Token Redeemed Successfully",
        description: `Transaction Hash: ${writeData.hash}`,
      });
    }
  }, [writeData, writeSuccess]);

  useEffect(() => {
    if (writeLoading) {
      toast({
        title: "Transaction in Progress",
        description: "Burning token and redeeming, please wait...",
      });
    }
  }, [writeLoading]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    if (amountTokenToBurn > tokenAmount) {
      toast({
        variant: "destructive",
        title: "Error in redeeming the Token",
        description: "Amount to burn is more than available balance",
      });
      return;
    }

    await redeemToken();
  };

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardDescription>
          Select token to burn to redeem collateral
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Select the token to burn here */}
            <div className="flex gap-3 justify-between">
              <FormField
                control={form.control}
                name="debtToken"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Burn</FormLabel>
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
                              ? MINT_TOKENS.find(
                                  (mintToken) =>
                                    mintToken.symbol === field.value
                                )?.label
                              : "Select Token"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className={cn(searchBoxWidth, "p-0")}>
                        <Command>
                          <CommandInput placeholder="Search tokens..." />
                          <CommandEmpty>No tokens found.</CommandEmpty>
                          <CommandGroup>
                            {MINT_TOKENS.map((mintTokens) => (
                              <CommandItem
                                value={mintTokens.label}
                                key={mintTokens.value}
                                onSelect={() => {
                                  form.setValue("debtToken", mintTokens.symbol);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    mintTokens.symbol === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {mintTokens.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show symbol & Amount */}
              <FormItem className="flex flex-col">
                <FormLabel>Symbol</FormLabel>
                <div className="flex flex-col h-full justify-center">
                  <FormDescription>{`DSC`}</FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-col">
                <FormLabel>Amount</FormLabel>
                <div className="flex flex-col h-full justify-center">
                  <FormDescription>{`${tokenAmount}`}</FormDescription>
                </div>
              </FormItem>
            </div>

            {/* Select the collateral token here, a contract can have more than one collateral */}

            <Separator className="my-4" />

            <div className="flex gap-3 justify-between">
              <FormField
                control={form.control}
                name="collateralToken"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Redeem</FormLabel>
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
                              ? INPUT_TOKENS.find(
                                  (inputToken) =>
                                    inputToken.symbol === field.value
                                )?.label
                              : "Select Token"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className={cn(searchBoxWidth, "p-0")}>
                        <Command>
                          <CommandInput placeholder="Search tokens..." />
                          <CommandEmpty>No tokens found.</CommandEmpty>
                          <CommandGroup>
                            {INPUT_TOKENS.map((inputTokens) => (
                              <CommandItem
                                value={inputTokens.label}
                                key={inputTokens.value}
                                onSelect={() => {
                                  form.setValue(
                                    "collateralToken",
                                    inputTokens.symbol
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    inputTokens.symbol === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {inputTokens.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      {`Amount Locked: ${collateralAmount}, in wallet ${collateralAmount}`}
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show symbol & Amount */}
              <FormItem className="flex flex-col">
                <FormLabel>Symbol</FormLabel>
                <div className="flex flex-col h-full justify-center">
                  <FormDescription>{`wETH`}</FormDescription>
                </div>
              </FormItem>

              <FormItem className="flex flex-col">
                <FormLabel>Amount</FormLabel>
                <div className="flex flex-col h-full justify-center">
                  <FormDescription>{`${collateralAmount}`}</FormDescription>
                </div>
              </FormItem>
            </div>
            {/* Input amount of minted tokens to burn */}
            <FormField
              control={form.control}
              name="debtAmountToBurn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Amount to Burn</FormLabel>
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
              <h4 className="text-sm font-medium leading-none ">Redeem</h4>
              <CardDescription className="text-base text-orange-500 font-bold">
                {" "}
                0.00 {selectedCollateralToken}
              </CardDescription>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;
