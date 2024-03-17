import { MintTokenObject, TokenObject } from "@/types";

// Contracts

// 0: contract USDFFX 0x6D122B43732c1678C21a0F43b6f4f894f3f16b12
// 1: contract USDFFXEngine 0x0d8b9aA1396043ed015d1890C35D31F841Eab4F3
// 2: contract HelperConfig 0xC7f2Cf4845C6db0e1a1e91ED41Bcd0FcC1b0E141

export const APP_NAME = "Fiend FX";
export const APP_DESCRIPTION = "A decentralised FX protocol using ZKP";
export const APP_URL = "https://fiendfx.com";
export const APP_ICON = "/logo.png";
export const APP_VERSION = "0.0.1";
export const TEST_ENGINE_ADDRESS = "0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98";
export const TEST_TOKEN_ADDRESS = "0xF30021646269007b0bdc0763fd736C6380602F2F";
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
  { label: "USD FiendFX", symbol: "USDFFX", value: TEST_TOKEN_ADDRESS },
  { label: "Wrapped BTC", symbol: "WBTC", value: "0x2" },
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
    label: "USD FiendFX",
    symbol: "USDFFX",
    value: TEST_TOKEN_ADDRESS,
    engine: TEST_ENGINE_ADDRESS,
  },
  {
    label: "EURO FiendFX",
    symbol: "EURFFX",
    value: TEST_TOKEN_ADDRESS,
    engine: TEST_ENGINE_ADDRESS,
  },
];
