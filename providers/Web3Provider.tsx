"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  localhost,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { APP_NAME } from '@/lib/constants';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, localhost],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || '' }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: APP_NAME,
    projectId: 'asldhflashdfashjkdfaslhdeuiyprt',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <div style={{ flexGrow: 1 }}>{children}</div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default Web3Provider;
