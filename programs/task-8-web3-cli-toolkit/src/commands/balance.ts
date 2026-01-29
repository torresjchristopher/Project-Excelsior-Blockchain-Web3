/**
 * Balance Command - Check account balances
 */

import chalk from 'chalk';
import { ethers } from 'ethers';
import { configManager } from '../utils/config.js';
import ora from 'ora';

interface BalanceOptions {
  address?: string;
  network?: string;
  token?: string;
}

export async function balanceCommand(options: BalanceOptions): Promise<void> {
  const spinner = ora().start();

  try {
    if (!options.address) {
      throw new Error('Address required (--address)');
    }

    const networkName = options.network || 'ethereum';
    const chain = configManager.getChain(networkName);

    spinner.text = `Connecting to ${chain.name}...`;
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    // Validate address
    if (!ethers.isAddress(options.address)) {
      throw new Error(`Invalid address: ${options.address}`);
    }

    // Check ETH balance
    spinner.text = `Fetching balance for ${options.address}...`;
    const balance = await provider.getBalance(options.address);
    const balanceEth = ethers.formatEther(balance);

    spinner.succeed(
      chalk.green(`Balance for ${options.address}:\n`) +
        chalk.cyan(`  ETH: ${balanceEth}\n`) +
        chalk.dim(`  Network: ${chain.name}\n`) +
        chalk.dim(`  Timestamp: ${new Date().toISOString()}`)
    );

    // Token balance if specified
    if (options.token) {
      spinner.start('Fetching token balance...');
      // ERC-20 balance check would go here
      spinner.succeed('Token balance check ready for implementation');
    }
  } catch (error) {
    spinner.fail(chalk.red(`Balance check failed: ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
}
