export type WalletDistribution = {
  address: string;
  amount: number;
  name: string;
};

export type Distribution = {
  supply: number;
  allocations: WalletDistribution[];
};
