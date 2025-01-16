export type CommandBaseOptions = {
  cluster: "devnet" | "testnet" | "mainnet-beta";
  keypair: string;
  rpc?: string;
};
