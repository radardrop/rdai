# RadarDrop's $RDAI SPL-Token

## Basic Information about $RDAI

- Ticker: $RDAI (_stands for RadarDrop AI_)
- Supply: 1B (1,000,000,000)
- Tokenomics
  sheet: [accessible here](https://docs.google.com/spreadsheets/d/1X_7MqQoHsAQmniUMAee-scpgy3cg6kb2ugjqzf7oQHg/edit?gid=408212072#gid=408212072)

## Installation

1. Install [Rust](https://www.rust-lang.org/tools/install)
2. Install [Solana CLI](https://solana.com/docs/intro/installation)
3. Install Metaboss by running `cargo install metaboss`
4. Install spl-token-cli by running `cargo install spl-token-cli`

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

To prevent the minter to freeze the token, run the following command:

```bash
spl-token authorize <token_address> freeze --disable
```

## Official $RDAI token deployed on Mainnet

- Minter Address: `GCBVTsuMngzLMuYb8TfzKQSyj7nmtJretUodiRVU2iCe`
- Signature: `5Pv26oD5Xu4G4SWgSEjagowoXX5pxC9LG9vGFGfH779DYa9h18y7xUdSEKci7Z8yseH1F3EcsfEAHp47fbAMxkEB`
- Mint: `94mWLUvaNcDM1BZTC4yaNRBbKMgQtLEz1GDHacbZsxDM`
- Metadata: `3rmMjFxawqi2GT4VqhVs7vpsEthGbXzkEzwpri2fdn7b`
- Mint Disabled Signature: `772Lgfp9LckCDXaSpAc7R396Cro6dvYctn3utghqLPDjyo2fLC3juorQkLLumekvH4ZcYt5oznZRfxSeu8SriKQ`
- Freeze Disabled Signature: `4nccTR2F8xioQj463MZwADHLfMayuvd2eCftPVk4Dw7ZtGPbWjPoHS9xDhPC4wbBCwoqrjex87PFWEzsKgUznBZf`

### Distribution Command:

```bash
> ts-node ./cli/main.ts "distribute" "distribution/mainnet/distribution.json" "--mint" "94mWLUvaNcDM1BZTC4yaNRBbKMgQtLEz1GDHacbZsxDM" "--keypair" "minter-mainnet.json" "--confirm" "--cluster" "mainnet-beta"

Here's a summary of all the distributions that will be made on your behalf:

Seed          -> HUx2NJrhB1NPq4GoZhzbqhivddSCehSk4ZgYBsDMchD2 -> 200,000,000 $RDAI (20%)
Seedify Opens -> 2Kkv61ZqDwPRfUMFtPqow1Lc6syo3XpQd5m6XxvgMqeK -> 57,142,857  $RDAI (5.71%)
KOLs          -> 9CLmnzQ7ZWKJzW64N8hHKD43mtWU95HK25G6LxFhnsJ3 -> 28,571,429  $RDAI (2.86%)
Public        -> H9q8UybDYQQVreaef2yCFuSBUhD2TJkMSBZnJGdFTGzk -> 342,857,142 $RDAI (34.29%)
Development   -> 4dneaCiLegSPLFvTrjV8ChLM1JTmvguFMmXHPU65PxtQ -> 60,000,000  $RDAI (6%)
Marketing     -> 5V5kxfKuzrVCBEBqq6CwKoWd4uNib2sTWdoNv9QTBxzF -> 61,428,572  $RDAI (6.14%)
Liquidity     -> DwEF49DW9vcQJdFkU1SzFKtNzCQoAaN8p5YrJAcFbBhP -> 70,000,000  $RDAI (7%)
Incentives    -> FQdQKns89nzx8UnWQHs1VQRRYQLZGGNmBAkaeDEbcmhd -> 10,000,000  $RDAI (1%)
Staking       -> DD2A2Qi7zzUj1VHcuK3L7Pmog3DARFa55c67bA1vqiZL -> 70,000,000  $RDAI (7%)
Team          -> AoUQoXh6LZ4oVUAPqbw5aTPSMDwNBQMbvo7XAZ3wHecL -> 100,000,000 $RDAI (10%)

All the tokens (1,000,000,000 $RDAI) are sent with this configuration.

Starting SPL token distribution...

Transferred 200,000,000 tokens to Seed (HUx2NJrhB1NPq4GoZhzbqhivddSCehSk4ZgYBsDMchD2). Tx: 2QAkGQwaSUExHhQxiS9HTobf7pyuwthjH6RrsntXjK7bDb1VtpAwQ7cFw7JpPrDLb52at5zQEA5MGVCpdmVQumHk
Transferred 57,142,857 tokens to Seedify Opens (2Kkv61ZqDwPRfUMFtPqow1Lc6syo3XpQd5m6XxvgMqeK). Tx: 2GuLgTuY6r2xchBbbo5u4JWpL7UQKujfufg6p5tZNELpDMwdiA8K9yjbPbgvLp96iZJnecG58NeMo1qTkCFr8Q8E
Transferred 28,571,429 tokens to KOLs (9CLmnzQ7ZWKJzW64N8hHKD43mtWU95HK25G6LxFhnsJ3). Tx: UEPFEK9pm371nXVonaysx7E8yWaS7NTP3eVM5A5ZNYVu2hUxVrYeCqEB739VYvDYjrpkHjLLj1b9EuLKBw5ifSU
Transferred 342,857,142 tokens to Public (H9q8UybDYQQVreaef2yCFuSBUhD2TJkMSBZnJGdFTGzk). Tx: UJKrWQsKHFD7jqu3Nbu2eMZs31tLAJe4F2XxgW6mtc54gL1y2VfaE4yUYJ43Pn496oDgzudA1ZJDdFnULfBiy1g
Transferred 60,000,000 tokens to Development (4dneaCiLegSPLFvTrjV8ChLM1JTmvguFMmXHPU65PxtQ). Tx: 5zDJyoqxq7xqztQUXiCR5FB4Ab49kLhBjRVzUsS23UNdDa5cG7f94uPGKTBFCpmkUQVhUdV2JLPc1gpt5FVQ3PEx
Transferred 61,428,572 tokens to Marketing (5V5kxfKuzrVCBEBqq6CwKoWd4uNib2sTWdoNv9QTBxzF). Tx: 5oD2yRSzZEm8MBTVTyhrrDXPk3VGTUjpyiyrY6zCeqYZKyPrwZBFLyU6YxXio1awt1JBrgp9vgUUvARQ5WDLemvZ
Transferred 70,000,000 tokens to Liquidity (DwEF49DW9vcQJdFkU1SzFKtNzCQoAaN8p5YrJAcFbBhP). Tx: 2E1TMtCji3CAqPY8fsGAKYAHbY6ufiCh81cVxF5B7gZPhTk46BBG2orPd3kWdR1ttLnRNC6jnD4B6X7we4vTrQAV
Transferred 10,000,000 tokens to Incentives (FQdQKns89nzx8UnWQHs1VQRRYQLZGGNmBAkaeDEbcmhd). Tx: 5DdHwrbVSwmFTWNnn9LxPDpBjVj83e14g8JF23Hkd5N4qhTefoRBbLzbUEre8Kf8ff7DiGERLbt8ZKkbGCaDystD
Transferred 100,000,000 tokens to Team (AoUQoXh6LZ4oVUAPqbw5aTPSMDwNBQMbvo7XAZ3wHecL). Tx: 3oUk1eoX8CiLnBNwhMphKgH3JjMeUKxY6DZuN1hx3E6PeSDAyyoSyySm14WGbUHdxRkWoiM1L1QDYR3a1TZbBUTb
```
