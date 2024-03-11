# Decentralized Forex Exchange (DeFi FX) DApp

![Version](https://img.shields.io/badge/Version-0.1.0-brightgreen)
![Framework](https://img.shields.io/badge/Framework-Next.js-blue)
![React Version](https://img.shields.io/badge/React-18.0.0-blue)

The **Decentralized Forex Exchange (DeFi FX) DApp** is a next-generation platform providing a decentralized solution for forex trading. Powered by Ethereum blockchain technology, this application leverages smart contract functionalities to facilitate secure and transparent FX transactions.

## Key Features

- **Decentralized Forex Trading**: Trade various fiat pegged stablecoins in a decentralized environment.
- **Wallet Integration**: Easy and secure connection with popular wallets using ConnectKit.
- **Intuitive User Interface**: Built with Next.js and styled using TailwindCSS for a responsive and modern user interface.
- **Real-time Data Visualization**: Utilizing `lucide-react` for dynamic data display and interactive charts.
- **Responsive Design**: Fully responsive interface, optimized for a variety of devices and screen sizes.

<img width="812" alt="Screenshot 2024-03-10 at 11 37 07" src="https://github.com/fiendlabs/fiendfx-smart-contracts/assets/162796742/a4c10205-3a42-4153-8a47-99a4b3355c69">

## Installation and Setup

To get started with this project, you need to have Node.js installed on your system.

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/defi-fx.git
   ```
2. Install dependencies:
   ```
   cd defi-fx
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- **Frontend Framework**: Next.js (v14.0.4)
- **State Management**: React (v18)
- **Styling**: TailwindCSS with additional animation support via `tailwindcss-animate`.
- **Wallet Connection**: ConnectKit and Wagmi for seamless wallet integration.
- **Icons and Graphics**: Lucide React for modern, scalable icons.

## Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production usage.
- `npm run start` - Runs the built app in production mode.
- `npm run lint` - Runs the linter for code quality checks.

## Testing

### Key Addresses On Sepolia

DSC Coin: 0xF30021646269007b0bdc0763fd736C6380602F2F
WETH: 0xdd13E55209Fd76AfE204dBda4007C227904f0a81

### Testing Locally

Run a forked version of sepolica locally


`anvil --chain-id 1337 --fork-url $SEPOLIA_RPC_URL`

You should now have a the RPC url (it'll be local host) and a set of accounts.

Then run these commands

Get wEth

```
cast send 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 "deposit()" --value 0.1ether --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

Approve weth

```
cast send 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 "approve(address,uint256)" 0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98 1000000000000000000 --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```

Mint DSC
```
cast send 0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98 "depositCollateralAndMintDsc(address,uint256,uint256)" 0xdd13E55209Fd76AfE204dBda4007C227904f0a81 100000000000000000 10000000000000000 --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
```





### On Sepolia
Example smart contract (DSC Engine) on sepolia: [`0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98`](https://sepolia.etherscan.io/address/0x091EA0838eBD5b7ddA2F2A641B068d6D59639b98#code)

You can get test Weth via: https://sepolia.etherscan.io/address/0xdd13E55209Fd76AfE204dBda4007C227904f0a81#writeContract

[Video Link](https://youtu.be/wUjYK5gwNZs?si=hb2TsMS_P44MglU-&t=6715)

## Contributing

We encourage community contributions! Please read our contributing guidelines to get started with your contributions.

## Security

Security is a priority for us. If you discover any issues, please contact us via [security contact].

## To Do
[] Burn tokens
   [] Select token to burn (and retireve the correct smart contract)
   [] Get deposits for smart contract
   [] Select token to withdraw (if more than one token was deposited)
[] Implement global store (jotai)
[x] Get precision once and resuse in app
[x] Get addresss once and resuse in app

[] Get token priciing
   [] [Uniswap api](https://docs.uniswap.org/sdk/v3/guides/swaps/quoting)
   [] Moralis.io api
   [] Coinlayer api
   [] Crypto compare : https://min-api.cryptocompare.com/pricing

[] Smart Contract Create First Token
   [] Publish token on test net
   [] Publish token on main net
   [] Update Front End to use published token

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Designed with ❤️ by anon. Join our [community](#) for updates and discussions.
