import { Command, Option } from "commander";
import { CommandBaseOptions } from "../type/base.type";
import { getWalletFromKeypair } from "../utils/wallet-from-keypair";
import * as anchor from "@coral-xyz/anchor";

export const getBaseCommand = (program: Command, name: string) => {
  const homePath = process.env.HOME || process.env.USERPROFILE || "/root";
  return program
    .command(name)
    .addOption(
      new Option("-c, --cluster <cluster>", "The cluster to use")
        .choices(["devnet", "testnet", "mainnet-beta"])
        .default("devnet"),
    )
    .addOption(new Option("--rpc <rpc>", "The RPC URL to use"))
    .addOption(
      new Option(
        "-k, --keypair <keypair>",
        "The Solana keypair to use",
      ).default(`${homePath}/.config/solana/id.json`),
    );
};

export const initCommand = (params: CommandBaseOptions) => {
  const wallet = getWalletFromKeypair(params.keypair);
  const rpc = params.rpc
    ? params.rpc
    : anchor.web3.clusterApiUrl(params.cluster);
  const connection = new anchor.web3.Connection(rpc, "confirmed");

  return {
    wallet,
    rpc,

    connection,
  };
};
