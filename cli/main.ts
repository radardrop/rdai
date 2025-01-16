import { program } from "commander";
import { setupDistributionCommand } from "./commands/distribute";

program
  .name("rdai-cli")
  .description("CLI to manage some commands relative to the $RDAI SPL-token")
  .version("1.0.0");

setupDistributionCommand(program);

program.parse();
