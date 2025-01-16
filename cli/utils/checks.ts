import { PublicKey } from "@solana/web3.js";
import { InvalidArgumentError } from "commander";
import * as fs from "node:fs";
import { Distribution } from "../type/distribution.type";

/**
 * This method makes sure the input is a valid base58 Solana address.
 *
 * @param input
 */
export const parseBase58 = (input: string) => {
  try {
    new PublicKey(input);
    return input;
  } catch {
    throw new InvalidArgumentError("Invalid Solana Base58 Address");
  }
};

export const parseDistributionFile = (path: string): Distribution => {
  try {
    const buffer = fs.readFileSync(path);
    const content = JSON.parse(buffer.toString("utf-8"));

    if (!content.allocations)
      throw new InvalidArgumentError(`${path}.distribution must be defined`);
    if (!Array.isArray(content.allocations))
      throw new InvalidArgumentError(`${path}.distribution must be an array`);

    return content;
  } catch (e) {
    throw new InvalidArgumentError(e.message);
  }
};
