# ⛓️ Web3 CLI Toolkit

**Production-Grade Web3 Developer Tools for Smart Contract Deployment, Interaction, and Monitoring**

> *"Your command-line gateway to the Ethereum ecosystem"*

## 🎯 Overview

Advanced Web3 CLI toolkit providing developers with powerful, production-ready tools for:
- 🚀 **Smart Contract Deployment** - Deploy to any EVM chain
- 📞 **Contract Interaction** - Call functions, send transactions
- ⛽ **Gas Management** - Real-time gas estimation and optimization
- ✅ **Contract Verification** - Verify on block explorers
- 🔒 **Security Scanning** - Automated vulnerability detection
- 📛 **ENS Resolution** - Domain name system integration
- 💰 **Balance Checking** - Multi-chain account monitoring

## 🚀 Quick Start

### Installation

```bash
# Global npm install
npm install -g web3-cli-toolkit

# Or from source
git clone https://github.com/torresjchristopher/Project-Excelsior-Blockchain-Web3.git
cd Project-Excelsior-Blockchain-Web3/programs/task-8-web3-cli-toolkit
npm install
npm run build
npm link
```

### Basic Usage

```bash
# Show help
web3 --help

# Check ETH balance
web3 balance --address 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE --network ethereum

# Estimate gas prices
web3 gas --network ethereum

# Deploy contract (with bytecode)
web3 deploy --file Token.sol --network sepolia --private-key $PRIVATE_KEY

# Call contract function
web3 call --address 0x... --function balanceOf --args user_address

# Send transaction
web3 send --to 0x... --value 1.5 --private-key $PRIVATE_KEY

# Verify on Etherscan
web3 verify --address 0x... --source Token.sol --network ethereum

# Security scan
web3 scan --address 0x...

# ENS lookup
web3 ens --name vitalik.eth
```

## 📋 Supported Networks

| Network | Chain ID | Status |
|---------|----------|--------|
| Ethereum Mainnet | 1 | ✅ |
| Sepolia Testnet | 11155111 | ✅ |
| Polygon | 137 | ✅ |
| Arbitrum One | 42161 | ✅ |
| Optimism | 10 | ✅ |
| Localhost | - | ✅ |

Add custom RPC endpoints with configuration:

```bash
web3 config set-rpc ethereum https://eth.public.nanopool.org
```

## 🛠️ Commands

### deploy
Deploy smart contracts to any EVM network

```bash
web3 deploy \
  --file MyContract.sol \
  --network ethereum \
  --private-key $PRIVATE_KEY \
  --constructor "arg1" "arg2"
```

**Features:**
- Multi-chain deployment
- Constructor argument handling
- Gas optimization
- Deployment verification

**Output:**
```
✓ Contract deployed!
  Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE
  Tx Hash: 0xabc123...
  Network: Ethereum
  Gas Used: 500,000
```

### call
Call read-only contract functions

```bash
web3 call \
  --address 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE \
  --function balanceOf \
  --args 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE \
  --network ethereum
```

**Features:**
- ABI decoding
- Return value formatting
- Multi-chain support
- Batch calling

### send
Send transactions (state-changing operations)

```bash
web3 send \
  --to 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE \
  --value 1.5 \
  --private-key $PRIVATE_KEY \
  --network ethereum
```

**Features:**
- ETH transfers
- Contract interaction
- Gas limit control
- Transaction confirmation

### gas
Real-time gas price estimation

```bash
web3 gas --network ethereum

# Output
┌─────────────────────┬──────────────┐
│ Metric              │ Value        │
├─────────────────────┼──────────────┤
│ Base Gas Price      │ 42.5 Gwei    │
│ Max Priority Fee    │ 2.1 Gwei     │
│ Max Fee Per Gas     │ 44.6 Gwei    │
│ Estimated Gas Limit │ 21000        │
│ Network             │ Ethereum     │
└─────────────────────┴──────────────┘
```

**Features:**
- EIP-1559 support
- Legacy gas price estimation
- Transaction simulation
- Cost calculation

### verify
Verify contracts on block explorers

```bash
web3 verify \
  --address 0x742d35... \
  --source MyToken.sol \
  --network ethereum \
  --constructor "MYTOKEN" "MTK" 18
```

**Features:**
- Etherscan verification
- Multi-chain support
- Constructor argument encoding
- ABI submission

### scan
Security scanning for vulnerabilities

```bash
web3 scan --address 0x742d35... --network ethereum
```

**Analysis includes:**
- Known vulnerability patterns
- Reentrancy risks
- Integer overflow/underflow
- Unchecked external calls
- Access control issues

**Output:**
```
Security Report: 0x742d35...
Severity: Medium
Issues Found: 3
- Medium: Potential reentrancy in transfer
- Low: Missing emit in setter
- Info: Unused variable
```

### ens
ENS name resolution and reverse lookup

```bash
# Forward resolution
web3 ens --name vitalik.eth

# Reverse lookup
web3 ens --address 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE
```

**Features:**
- Name resolution
- Reverse resolution
- Avatar resolution
- Text records

### balance
Check account balances across networks

```bash
# ETH balance
web3 balance --address 0x742d35... --network ethereum

# ERC-20 token balance
web3 balance --address 0x742d35... --token 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 --network ethereum
```

**Output:**
```
Balance for 0x742d35Cc6634C0532925a3b844Bc9e7595f42bE:
  ETH: 42.5
  Network: Ethereum
  Timestamp: 2024-01-29T18:00:00Z
```

## 🔧 Configuration

### Environment Variables

```bash
# Private key (use with caution!)
export PRIVATE_KEY=0x123...

# RPC endpoints
export RPC_ETHEREUM=https://eth.public.nanopool.org
export RPC_POLYGON=https://polygon-rpc.com

# Block explorer API keys
export ETHERSCAN_API_KEY=YOUR_KEY
export POLYGONSCAN_API_KEY=YOUR_KEY
```

### Config File

Store configuration in `~/.web3-cli/config.json`:

```json
{
  "defaultNetwork": "ethereum",
  "chains": {
    "ethereum": {
      "name": "Ethereum Mainnet",
      "chainId": 1,
      "rpcUrl": "https://eth.public.nanopool.org",
      "explorerUrl": "https://etherscan.io",
      "scannerUrl": "https://api.etherscan.io/api"
    }
  },
  "privateKeys": {
    "deployment": "0x123...",
    "operations": "0x456..."
  }
}
```

## 📚 Examples

### Example 1: Deploy ERC-20 Token

```bash
# Compile contract
solc Token.sol --bin --abi -o build/

# Deploy to Sepolia testnet
web3 deploy \
  --file build/Token.bin \
  --network sepolia \
  --private-key $PRIVATE_KEY \
  --constructor "MyToken" "MTK" "18"

# Verify on Etherscan
web3 verify \
  --address 0xDEPLOYED_ADDRESS \
  --source Token.sol \
  --network sepolia
```

### Example 2: Multi-Chain Balance Checker

```bash
#!/bin/bash

ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f42bE

echo "=== Wallet Balance Report ==="
echo "Address: $ADDRESS"
echo ""

for network in ethereum polygon arbitrum optimism; do
  echo "[$network]"
  web3 balance --address $ADDRESS --network $network
  echo ""
done
```

### Example 3: Gas Price Monitor

```bash
#!/bin/bash

while true; do
  clear
  echo "=== Real-Time Gas Prices ==="
  web3 gas --network ethereum
  echo ""
  echo "Updated: $(date)"
  sleep 30
done
```

### Example 4: Contract Interaction Script

```bash
# Call balanceOf
web3 call \
  --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 \
  --function balanceOf \
  --args $ADDRESS \
  --network ethereum

# Get total supply
web3 call \
  --address 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 \
  --function totalSupply \
  --network ethereum
```

## 🧪 Testing

```bash
# Run test suite
npm test

# With coverage
npm run test:coverage

# Integration tests
npm run test:integration
```

## 📦 Package Distribution

### NPM

```bash
# Build
npm run build

# Publish
npm publish

# Install globally
npm install -g web3-cli-toolkit
```

### Binary Distribution

```bash
# Create standalone binary
npm run build:binary

# Platform-specific
npm run build:binary -- --platforms win,linux,macos
```

## 🛠️ Architecture

```
src/
├── cli.ts                 # Main entry point
├── commands/
│   ├── deploy.ts          # Contract deployment
│   ├── call.ts            # Read function calls
│   ├── send.ts            # Transaction sending
│   ├── gas.ts             # Gas estimation
│   ├── verify.ts          # Contract verification
│   ├── scan.ts            # Security scanning
│   ├── ens.ts             # ENS resolution
│   └── balance.ts         # Balance checking
├── utils/
│   ├── config.ts          # Configuration management
│   ├── contracts.ts       # Contract helpers
│   └── formatting.ts      # Output formatting
└── types/
    └── index.ts           # TypeScript definitions
```

## 📊 Performance Benchmarks

| Operation | Time | Network |
|-----------|------|---------|
| Balance check | <500ms | Ethereum |
| Gas estimate | <800ms | Ethereum |
| Contract call | <1s | Ethereum |
| Deploy contract | 30-60s | Testnet |
| ENS resolution | <300ms | Mainnet |

## 🔒 Security Considerations

### Private Key Safety

⚠️ **NEVER commit private keys to version control!**

```bash
# Good: Use environment variables
export PRIVATE_KEY=$(cat .secret)
web3 deploy --private-key $PRIVATE_KEY

# Good: Use local config (excluded from git)
# ~/.web3-cli/config.json (in .gitignore)

# Bad: Don't do this!
web3 deploy --private-key 0x123...  # Shows in shell history
```

### Transaction Verification

Always verify transactions before signing:

```bash
# Check transaction details
web3 send --to 0x... --value 1.5 --dry-run

# Then execute with confidence
web3 send --to 0x... --value 1.5 --private-key $PRIVATE_KEY
```

## 🐛 Troubleshooting

### "Invalid RPC URL"

```bash
# Check RPC endpoint
web3 config set-rpc ethereum https://eth.public.nanopool.org

# Test connection
web3 balance --address 0x742d35... --network ethereum
```

### "Account has no balance"

```bash
# Send testnet ETH first
# Sepolia faucet: https://sepoliafaucet.com

# Check balance
web3 balance --address 0xYOUR_ADDRESS --network sepolia
```

### "Private key format incorrect"

```bash
# Private key should be 0x prefixed hex
# Correct: 0x1234abcd...
# Wrong: 1234abcd... (missing 0x)
# Wrong: 0x1234 (incomplete)

# Validate
web3 validate-key --key $PRIVATE_KEY
```

## 📖 Documentation

- **[Ethers.js Docs](https://docs.ethers.org/)** - JavaScript SDK
- **[Ethereum Docs](https://ethereum.org/en/developers/)** - Protocol reference
- **[OpenZeppelin](https://docs.openzeppelin.com/)** - Smart contract library
- **[Solidity](https://docs.soliditylang.org/)** - Language documentation

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional blockchain networks (Solana, Cosmos, etc)
- Hardware wallet integration (Ledger, Trezor)
- Contract interaction UI
- Batch operations
- Multi-sig support
- DeFi specific commands

## 📄 License

MIT License - See LICENSE file

## ✉️ Support

Issues and questions:
- Check documentation
- Review examples/
- Create GitHub issues
- Discuss in Web3 communities

---

## 🚀 Next Steps

1. **Install**: `npm install -g web3-cli-toolkit`
2. **Setup**: `export PRIVATE_KEY=0x...`
3. **Verify**: `web3 balance --address 0x742d35...`
4. **Deploy**: `web3 deploy --file MyContract.sol --network sepolia`

**Built with ❤️ as part of Project Excelsior: Blockchain & Web3 Benchmarks**

*Master Web3 development. Lead the blockchain revolution.* 🔗
