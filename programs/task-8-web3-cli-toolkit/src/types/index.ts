/**
 * Web3 CLI Toolkit - Core Types
 */

export interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  scannerUrl: string;
}

export interface ContractConfig {
  address: string;
  abi: any[];
  name: string;
  network: string;
}

export interface DeploymentConfig {
  contractPath: string;
  constructorArgs: string[];
  network: string;
  gasLimit?: number;
  gasPrice?: string;
  privateKey: string;
}

export interface TransactionConfig {
  to: string;
  data?: string;
  value?: string;
  gasLimit?: number;
  gasPrice?: string;
}

export interface GasEstimate {
  standard: string;
  fast: string;
  fastest: string;
  safeGasPrice: string;
}

export interface VerificationConfig {
  address: string;
  sourceCode: string;
  constructorArgs?: string[];
  network: string;
  compilerVersion: string;
  optimizationEnabled: boolean;
  runs?: number;
}

export interface SecurityScanReport {
  address: string;
  network: string;
  issues: SecurityIssue[];
  score: number;
  timestamp: Date;
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  remediation?: string;
}

export interface CliConfig {
  defaultNetwork: string;
  rpc: {
    [key: string]: string;
  };
  privateKeys?: {
    [key: string]: string;
  };
  etherscanApiKey?: string;
  chains: {
    [key: string]: ChainConfig;
  };
}
