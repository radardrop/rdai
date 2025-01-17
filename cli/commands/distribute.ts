import { Command, Option } from "commander";
import { getBaseCommand, initCommand } from "./base-command";
import { parseBase58, parseDistributionFile } from "../utils/checks";
import { CommandBaseOptions } from "../type/base.type";
import { Distribution } from "../type/distribution.type";
import colors from "colors";
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getMint,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

type CommandOptions = {
  confirm?: true;
  mint: string;
};
type CommandParams = CommandBaseOptions &
  CommandOptions & {
    distribution: Distribution;
  };

export const setupDistributionCommand = (program: Command) => {
  getBaseCommand(program, "distribute")
    .description(
      "Distribute the tokens to the distribution list provided (json)",
    )
    .argument(
      "<distribution>",
      "The JSON file containing the distribution list",
      parseDistributionFile,
    )
    .requiredOption("-m, --mint <mint>", "The mint to distribute", parseBase58)
    .option(
      "--confirm",
      "If this field is added, the distribution will be done",
    )
    .action(
      (
        distribution: Distribution,
        options: CommandBaseOptions & CommandOptions,
      ) => invoke({ distribution, ...options }),
    );
};

const invoke = async (params: CommandParams) => {
  const { connection, wallet } = initCommand(params);

  console.log(
    colors.underline(
      "Here's a summary of all the distributions that will be made on your behalf:\n",
    ),
  );

  const supply = params.distribution.supply;
  const totalSent = params.distribution.allocations.reduce(
    (acc, allocation) => acc + allocation.amount,
    0,
  );
  const isTotalSent = supply === totalSent;
  const formatter = Intl.NumberFormat("en-us", {});

  const maxLen = Math.max(
    ...params.distribution.allocations.map((a) => a.name.length),
  );
  for (const allocation of params.distribution.allocations) {
    const percent = Math.round((allocation.amount / supply) * 100 * 100) / 100;
    console.log(
      colors.green(allocation.name.padEnd(maxLen)),
      "->",
      colors.bgYellow(allocation.address),
      "->",
      colors.italic(
        `${formatter.format(allocation.amount).padEnd(11)} $RDAI (${percent}%)`,
      ),
    );
  }

  if (isTotalSent) {
    console.log(
      colors.bgGreen(
        colors.white(
          `\nAll the tokens (${formatter.format(supply)} $RDAI) are sent with this configuration.`,
        ),
      ),
    );
  } else {
    console.log(
      colors.bgRed(
        `\nOnly ${formatter.format(totalSent)} on ${formatter.format(supply)} $RDAI are sent with this configuration.`,
      ),
    );

    return;
  }

  if (!params.confirm)
    return console.log(
      colors.magenta(
        "\nYou must add the '--confirm' parameter to send the transactions.",
      ),
    );

  const mintPubkey = new PublicKey(params.mint);
  const mint = await getMint(connection, mintPubkey);

  console.log(colors.cyan("\nStarting SPL token distribution...\n"));

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet.payer,
    mintPubkey,
    wallet.publicKey,
  );

  try {
    for (const allocation of params.distribution.allocations) {
      const recipientPubkey = new PublicKey(allocation.address);

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.payer, // payer for (possible) creation
        mintPubkey, // which mint
        recipientPubkey, // owner of the receiving account
        true,
      );

      const rawAmount = allocation.amount * Math.pow(10, mint.decimals);
      const transferIx = createTransferInstruction(
        fromTokenAccount.address, // source (sender) token account
        toTokenAccount.address, // destination (recipient) token account
        wallet.publicKey, // owner of source account
        rawAmount, // amount in lowest denomination
        [],
        TOKEN_PROGRAM_ID,
      );

      const tx = new Transaction().add(transferIx);

      const txSignature = await sendAndConfirmTransaction(connection, tx, [
        wallet.payer,
      ]);

      console.log(
        colors.green(
          `Transferred ${formatter.format(allocation.amount)} tokens to ${allocation.name} (${recipientPubkey.toBase58()}). Tx: ${txSignature}`,
        ),
      );
    }

    console.log(
      colors.bgGreen(
        colors.white("\nAll allocations have been successfully distributed!\n"),
      ),
    );
  } catch (err: any) {
    console.error(colors.bgRed("\nError while distributing tokens:"), err);
    process.exit(1);
  }
};
