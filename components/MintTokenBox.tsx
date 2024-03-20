"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

import { usePrepareContractWrite, useContractWrite,  useBalance, useAccount, useContractReads } from "wagmi";

// Contract Imports
import { TEST_ENGINE_ADDRESS, INPUT_TOKENS, TEST_ADDRESS, OUTPUT_TOKENS, TEST_TOKEN_ADDRESS, TEST_WETH_ADDRESS } from "@/lib/constants";
import { DscContractAbi } from "@/lib/DscContractAbi";
import { Abi, formatUnits, parseUnits } from "viem";
import { WethAbi } from "@/lib/WethAbi";

const outputTokens = OUTPUT_TOKENS;

const FormSchema = z.object({
  inputToken: z.string({
    required_error: "Please select an input token.",
  }),
  inputAmount: z
    .number({
      required_error: "Please enter an amount.",
    })
    .positive()
    .nonnegative(),
  outputToken: z.string({
    required_error: "Please select a token to mint.",
  }),
  outputAmount: z.number({}).optional(),
});


const MintTokenBox = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  console.log("address", address)
  const { data: balanceData, isError, isLoading } = useBalance({
    address
  })

  console.log("balanceData", balanceData)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inputAmount: 0,
      outputAmount: 0, // This will be calcualted
    },
  });

  const { watch, setValue } = form;

  // protect against NaN values

  const inputToken = watch("inputToken") || "0";
  const inputAmount = watch("inputAmount") || 0;
  const outputToken = watch("outputToken") || "0";
  const outputAmount = watch("outputToken") || 0;

    // Convert inputAmount and outputAmount to the correct format for the contract
    const inputAmountFormatted = parseUnits(inputAmount.toString(), 18);
    const outputAmountFormatted = parseUnits(outputAmount.toString(), 18);
  
  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: TEST_ENGINE_ADDRESS,
    abi: DscContractAbi,
    functionName: "depositCollateralAndMintDsc", // Replace with your function name
    args: [
      /* your function arguments here */
      
        "0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98"
        , parseUnits('1', 18), parseUnits('1', 18)]
    
  });



  const { data: writeData, isLoading: writeLoading, write } = useContractWrite(config);

   // Read values from the smart contract
   const { data: readData, isLoading: readLoading, error } = useContractReads({
    contracts: [
      {
        address: inputToken as `0x${string}`,
        abi: WethAbi as Abi,
        functionName: 'balanceOf',
        args: [TEST_ADDRESS],
      },
      {
        address: TEST_ENGINE_ADDRESS,
        abi: DscContractAbi as Abi,
        functionName: 'getCollateralTokenPriceFeed',
        args: [TEST_WETH_ADDRESS],
      }
    ],

   }
    
    
    
  
  );
  

  //  make conversionRate optional paramerter 
  const calculateOutputAmount = (amount: number, conversionRate: number = 0 ) => {
    return amount * conversionRate;
  };

  const addressResult = readData?.[0].result as bigint | undefined;

  const tokenPriceFeed = readData?.[1].result as bigint | undefined;
  console.log('inputToken', inputToken);
  console.log('readData', readData);
  console.log('error', error);

  console.log('addressResult', addressResult);

  const availableBalance = addressResult ? formatUnits(addressResult, 18) : 0;

  console.log('availableBalance', availableBalance);

  useEffect(() => {
    // if inputAmount is 0, undefined, or null, then set outputAmount to 0
    if (!inputAmount) {
      setValue("outputAmount", 0);
      return;
    }

    const outputAmount = calculateOutputAmount(inputAmount, 2365);
    setValue("outputAmount", outputAmount);
  }, [inputAmount, inputToken, outputToken, setValue]);

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {


      if (write === undefined ) {
        toast({
          title: "Write function not available",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <div className="text-white">Something went wrong with write</div>
              <code className="text-white">
                {JSON.stringify(formData, null, 2)}
              </code>
            </pre>
          ),
        });
        return;
      }

      
      const tx = await write();

      console.log('writeData', writeData)
      console.log(writeData)

      if(writeData) {
        toast({
          title: "Minting Successful",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <div className="text-white">Transaction Hash: {writeData.hash}</div>
              <code className="text-white">
                {JSON.stringify(formData, null, 2)}
              </code>
            </pre>
          ),
        });
      }

    } catch (error) {
      toast({
        title: "Minting Failed",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <div className="text-white">Something went wrong with write</div>
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),

      });
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Selection</CardTitle>
        <CardDescription>
          Choose collateral to deposit and tokens to mint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="inputToken"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deposit</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? INPUT_TOKENS.find(
                                (inputToken) => inputToken.value === field.value
                              )?.label
                            : "Select Token"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search tokens..." />
                        <CommandEmpty>No tokens found.</CommandEmpty>
                        <CommandGroup>
                          {INPUT_TOKENS.map((inputToken) => (
                            <CommandItem
                              value={inputToken.label}
                              key={inputToken.value}
                              onSelect={() => {
                                form.setValue("inputToken", inputToken.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  inputToken.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {inputToken.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {`Available Balance: ${availableBalance}`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Input Amount Field */}
            <FormField
              control={form.control}
              name="inputAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount To Deposit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="input-field-class"
                      //   value={field.value !== undefined && field.value !== null ? field.value : 0}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Output Token Field */}
            <FormField
              control={form.control}
              name="outputToken"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Mint</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? outputTokens.find(
                                (outputToken) =>
                                  outputToken.value === field.value
                              )?.label
                            : "Select Token"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search tokens..." />
                        <CommandEmpty>No tokens found.</CommandEmpty>
                        <CommandGroup>
                          {outputTokens.map((outputToken) => (
                            <CommandItem
                              value={outputToken.label}
                              key={outputToken.value}
                              onSelect={() => {
                                form.setValue("outputToken", outputToken.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  outputToken.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {outputToken.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The stable coin that will be minted.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Display Calculated Output Amount */}
            <div>
              <strong>Calculated Output Amount:</strong>{" "}
              {form.watch("outputAmount")}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MintTokenBox;
function useWallet(): { address: any; connector: any; isConnected: any; } {
  throw new Error("Function not implemented.");
}

