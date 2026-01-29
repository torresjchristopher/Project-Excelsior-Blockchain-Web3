/**
 * Web3 CLI Toolkit - Configuration Management
 */

import fs from 'fs';
import path from 'path';
import { CliConfig, ChainConfig } from '../types/index.js';

const DEFAULT_CONFIG: CliConfig = {
  defaultNetwork: 'ethereum',
  rpc: {},
  chains: {
    ethereum: {
      name: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrl: 'https://eth.public.nanopool.org',
      explorerUrl: 'https://etherscan.io',
      scannerUrl: 'https://api.etherscan.io/api',
    },
    sepolia: {
      name: 'Sepolia Testnet',
      chainId: 11155111,
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
      explorerUrl: 'https://sepolia.etherscan.io',
      scannerUrl: 'https://api-sepolia.etherscan.io/api',
    },
    polygon: {
      name: 'Polygon',
      chainId: 137,
      rpcUrl: 'https://polygon-rpc.com',
      explorerUrl: 'https://polygonscan.com',
      scannerUrl: 'https://api.polygonscan.com/api',
    },
    arbitrum: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      explorerUrl: 'https://arbiscan.io',
      scannerUrl: 'https://api.arbiscan.io/api',
    },
    optimism: {
      name: 'Optimism',
      chainId: 10,
      rpcUrl: 'https://mainnet.optimism.io',
      explorerUrl: 'https://optimismscan.io',
      scannerUrl: 'https://api-optimistic.etherscan.io/api',
    },
  },
};

export class ConfigManager {
  private configPath: string;
  private config: CliConfig;

  constructor() {
    this.configPath = path.join(process.env.HOME || process.env.USERPROFILE || '', '.web3-cli', 'config.json');
    this.config = this.loadConfig();
  }

  private loadConfig(): CliConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const raw = fs.readFileSync(this.configPath, 'utf-8');
        return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
      }
    } catch (error) {
      console.warn('Could not load config file, using defaults');
    }
    return DEFAULT_CONFIG;
  }

  public saveConfig(): void {
    const dir = path.dirname(this.configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  public getConfig(): CliConfig {
    return this.config;
  }

  public getChain(chainName: string): ChainConfig {
    const chain = this.config.chains[chainName];
    if (!chain) {
      throw new Error(`Chain '${chainName}' not configured`);
    }
    return chain;
  }

  public setRpcUrl(chainName: string, rpcUrl: string): void {
    if (!this.config.chains[chainName]) {
      throw new Error(`Chain '${chainName}' not found`);
    }
    this.config.chains[chainName].rpcUrl = rpcUrl;
    this.saveConfig();
  }

  public setPrivateKey(accountName: string, privateKey: string): void {
    if (!this.config.privateKeys) {
      this.config.privateKeys = {};
    }
    this.config.privateKeys[accountName] = privateKey;
    this.saveConfig();
  }

  public getPrivateKey(accountName: string): string | undefined {
    return this.config.privateKeys?.[accountName];
  }

  public listChains(): string[] {
    return Object.keys(this.config.chains);
  }
}

export const configManager = new ConfigManager();
