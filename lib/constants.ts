import { MintTokenObject, TokenObject } from "@/types";

export const APP_NAME = "Fiend FX";
export const APP_DESCRIPTION = "A decentralised FX protocol using ZKP";
export const APP_URL = "https://fiendfx.com";
export const APP_ICON = "/logo.png";
export const APP_VERSION = "0.0.1";
export const TEST_DSCE_ADDRESS = "0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98";
export const TEST_DSC_ADDRESS = "0xF30021646269007b0bdc0763fd736C6380602F2F";
export const TEST_WETH_ADDRESS = "0xdd13E55209Fd76AfE204dBda4007C227904f0a81";
export const TEST_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
export const INPUT_TOKENS = [
  { label: "Ethereum", symbol: "eth", value: "0x1" },
  { label: "Wrapped BTC", symbol: "wbtc", value: "0x2" },
  {
    label: "Wrapped Ethereum",
    symbol: "weth",
    value: TEST_WETH_ADDRESS,
  },
  { label: "USDC", symbol: "usdc", value: "0x3" },
  { label: "USDT", symbol: "usdt", value: "0x4" },
];

export const OUTPUT_TOKENS = [
  { label: "Decentralized Stable Coin", symbol: "DSC", value: TEST_DSC_ADDRESS },
  { label: "Wrapped BTC", symbol: "wbtc", value: "0x2" },
  {
    label: "Wrapped ETH",
    symbol: "weth",
    value: TEST_WETH_ADDRESS,
  },
  { label: "USDC", symbol: "usdc", value: "0x3" },
  { label: "USDT", symbol: "usdt", value: "0x4" },
];


export const MINT_TOKENS: MintTokenObject[] = [
  {
    label: "Decentralized Stable Coin",
    symbol: "DSC",
    value: TEST_DSC_ADDRESS,
    engine: TEST_DSCE_ADDRESS,
  },
  {
    label: "Decentralized Stable Coin Euro",
    symbol: "DSCE",
    value: '0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98',
    engine: TEST_DSCE_ADDRESS,
  },
];
