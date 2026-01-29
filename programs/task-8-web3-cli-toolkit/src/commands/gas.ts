/**
 * Gas Command - Estimate gas prices
 */

import chalk from 'chalk';
import { ethers } from 'ethers';
import { configManager } from '../utils/config.js';
import ora from 'ora';
import axios from 'axios';
import { table } from 'table';

interface GasOptions {
  network?: string;
  to?: string;
  data?: string;
}

export async function gasCommand(options: GasOptions): Promise<void> {
  const spinner = ora().start();

  try {
    const networkName = options.network || 'ethereum';
    const chain = configManager.getChain(networkName);

    spinner.text = `Fetching gas prices from ${chain.name}...`;
    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    // Get current gas price
    const feeData = await provider.getFeeData();

    if (!feeData.gasPrice) {
      throw new Error('Could not fetch gas price');
    }

    const gasPrice = ethers.formatUnits(feeData.gasPrice, 'gwei');
    const maxPriorityFee = feeData.maxPriorityFeePerGas ? ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei') : 'N/A';
    const maxFeePerGas = feeData.maxFeePerGas ? ethers.formatUnits(feeData.maxFeePerGas, 'gwei') : 'N/A';

    // Estimate gas limit if tx params provided
    let gasLimit = 'N/A';
    if (options.to && options.data) {
      try {
        const estimate = await provider.estimateGas({
          to: options.to,
          data: options.data,
        });
        gasLimit = estimate.toString();
      } catch (e) {
        gasLimit = '21000 (standard)';
      }
    }

    const gasData = [
      ['Metric', 'Value'],
      ['Base Gas Price', `${gasPrice} Gwei`],
      ['Max Priority Fee', `${maxPriorityFee} Gwei`],
      ['Max Fee Per Gas', `${maxFeePerGas} Gwei`],
      ['Estimated Gas Limit', gasLimit],
      ['Network', chain.name],
      ['Timestamp', new Date().toISOString()],
    ];

    spinner.succeed(chalk.green(`\nCurrent Gas Prices (${chain.name}):\n`));
    console.log(table(gasData));
  } catch (error) {
    spinner.fail(chalk.red(`Gas estimation failed: ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
}
