#!/usr/bin/env node

/**
 * Web3 CLI Toolkit - Main CLI Entry Point
 * Production-grade Web3 developer tools
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { deployCommand } from './commands/deploy.js';
import { callCommand } from './commands/call.js';
import { sendCommand } from './commands/send.js';
import { gasCommand } from './commands/gas.js';
import { verifyCommand } from './commands/verify.js';
import { scanCommand } from './commands/scan.js';
import { ensCommand } from './commands/ens.js';
import { balanceCommand } from './commands/balance.js';

const program = new Command();

program
  .name('web3')
  .description('🔗 Web3 CLI Toolkit - Production-Grade Blockchain Developer Tools')
  .version('1.0.0');

// Deploy command
program
  .command('deploy')
  .description('Deploy a smart contract')
  .option('-f, --file <path>', 'Path to contract file')
  .option('-n, --network <name>', 'Network name (ethereum, sepolia, polygon, etc)')
  .option('-c, --constructor <args...>', 'Constructor arguments')
  .option('-p, --private-key <key>', 'Private key for deployment')
  .action(deployCommand);

// Call command
program
  .command('call')
  .description('Call a contract function (read-only)')
  .option('-a, --address <addr>', 'Contract address')
  .option('-f, --function <name>', 'Function name')
  .option('-a, --args <args...>', 'Function arguments')
  .option('-n, --network <name>', 'Network name')
  .action(callCommand);

// Send command
program
  .command('send')
  .description('Send a transaction')
  .option('-t, --to <addr>', 'Recipient address')
  .option('-v, --value <amount>', 'ETH amount to send')
  .option('-d, --data <data>', 'Transaction data (contract call)')
  .option('-p, --private-key <key>', 'Private key for signing')
  .option('-n, --network <name>', 'Network name')
  .action(sendCommand);

// Gas estimation
program
  .command('gas')
  .description('Estimate gas prices')
  .option('-n, --network <name>', 'Network name')
  .option('-t, --to <addr>', 'Recipient address (optional)')
  .option('-d, --data <data>', 'Transaction data (optional)')
  .action(gasCommand);

// Contract verification
program
  .command('verify')
  .description('Verify contract on block explorer')
  .option('-a, --address <addr>', 'Contract address')
  .option('-s, --source <path>', 'Source code file')
  .option('-n, --network <name>', 'Network name')
  .option('-c, --constructor <args...>', 'Constructor arguments')
  .action(verifyCommand);

// Security scanning
program
  .command('scan')
  .description('Security scan of contract')
  .option('-a, --address <addr>', 'Contract address')
  .option('-n, --network <name>', 'Network name')
  .action(scanCommand);

// ENS resolution
program
  .command('ens')
  .description('Resolve ENS names')
  .option('-n, --name <name>', 'ENS name to resolve')
  .option('-a, --address <addr>', 'Address to reverse lookup')
  .action(ensCommand);

// Balance checking
program
  .command('balance')
  .description('Check account balance')
  .option('-a, --address <addr>', 'Account address')
  .option('-n, --network <name>', 'Network name')
  .option('-t, --token <addr>', 'Token address for ERC-20 balance')
  .action(balanceCommand);

// Version
program
  .command('version')
  .description('Show version')
  .action(() => {
    console.log(chalk.cyan('web3-cli-toolkit v1.0.0'));
  });

// Help
program
  .command('help')
  .description('Show help')
  .action(() => {
    program.outputHelp();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
