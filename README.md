# RadarDrop's $RDAI SPL-Token

## Basic Information about $RDAI

- Ticker: $RDAI (_stands for RadarDrop AI_)
- Supply: 1B (1,000,000,000)
- Tokenomics
  sheet: [accessible here](https://docs.google.com/spreadsheets/d/1X_7MqQoHsAQmniUMAee-scpgy3cg6kb2ugjqzf7oQHg/edit?gid=408212072#gid=408212072)

## Installation

1. Install [Rust](https://www.rust-lang.org/tools/install)
2. Install [Solana CLI](https://solana.com/docs/intro/installation)
3. Install Metaboss by running ``cargo install metaboss``
4. Install spl-token-cli by running ``cargo install spl-token-cli``

## Get Started

To start, you will need a solana keypair with SOL on it.

To generate a keypair, just run the following command:
```bash
solana-keygen new --outfile minter.json
```

Then, ask for a devnet airdrop:
```bash
solana airdrop 2 --keypair minter.json --url devnet
```

Set the minter.json as your keypair on solana
```bash
solana config set --keypair minter.json 
```

## Deploy to Devnet

Simply run the following to deploy with 1B supply and 9 decimals:
```bash
metaboss create fungible -d 9 -i 1000000000 -k minter.json -m ./metaboss-metadata.json --rpc https://api.devnet.solana.com
```

To prevent future mint of the token, run the following command:
```bash
spl-token authorize <token_address> mint --disable --url devnet
```

$RDAI is currently deployed with this address: `Gx6JJx1v5cfy3hGeckt6NcmNfm6RwKfiTS1tcuBwgook` (https://explorer.solana.com/address/Gx6JJx1v5cfy3hGeckt6NcmNfm6RwKfiTS1tcuBwgook?cluster=devnet)

## Deploy to Mainnet

Simply run the following to deploy with 1B supply and 9 decimals:
```bash
metaboss create fungible -d 9 -i 1000000000 -k minter.json -m ./metaboss-metadata.json --rpc https://api.mainnet-beta.solana.com
```

To prevent future mint of the token, run the following command:
```bash
spl-token authorize <token_address> mint --disable
```
