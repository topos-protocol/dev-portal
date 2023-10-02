---
title: Topos Testnet
description: The Topos testnet, overview and how-to
---

# Topos Testnet

The Topos testnet currently features two subnets, Incal and Topos Subnet, along with a sequencer and an instance of the Executor Service (as we progress through subsequent phases of the testnet, more subnets will be permissionlessly added). It provides all the infrastructure needed to deploy Smart Contracts to Incal and interact across subnets. The architecture of the testnet is identical to what you saw in the [Topos Playground Overview](./1-ERC20-Messaging.html).
As mentioned [previously](./2-explorer.md), the Topos testnet explorer is available at [https://explorer.testnet-1.topos.technology](https://explorer.testnet-1.topos.technology).

The Topos protocol is undergoing heavy development and features will be rolled out incrementally over time until mainnet is launched in 2024. The phases outlined below will change as detailed planning progresses.

## Phase 1: Core Infrastructure

This is where we are today. Phase 1 provides the basic building blocks and connects them all together, providing the foundation for further work and refinement. Not all components are fully functional (e.g. no ZK proofs, deterministic broadcasts rather than the more performant probabilistic flavour described in the whitepaper), but all of the main interfaces are there and operational, ready for developers and early adopters.

Included in Phase 1:

- Networking and block production/propagation
- Node synchronization and transactions processing
- Smart Contract deployment and interaction

## Phase 2: Community

Phase 2 is where we onboard the community and enable a wider involvment of partners and users across web3 and enterprise. During Phase 2, we will integrate with existing third-party testnets, provide access to the Topos ZK stack to developers, provide a more extensive and polished suite of tools.

## Phase 3: Ecosystem

Phase 3 solidifies the community involvment into an actual ecosystem of projects, including the complete staking system (delegation, rewards, token issuance mechanics etc) and on-chain governance, allowing for permissionless subnet registration and collective decision making. In this phase we expect do deliver the full suite of required tooling (explorer, exchange integrationtools, "stdlib" for Smart Contract developers etc).

## Phase 4: Advanced features
Phase 4 is where it all comes together and the full power of ZK cryptography is made available.

Included in Phase 4:

- Certificates are threshold signed, pubkey as registration key/ID, and key resharing enabled (ICE-FROST)
- Oracle integration
- On-chain protocol upgrades
- zkEVM integration

## Phase 5: Security and stress test
Phase 5 is the last phase before mainnet and dedicated to tying up loose ends, perform audits, performance and stress tests.

Included in Phase 5:

- Penetration Testing
- Bounty Programs
- Network Stress Testing
- Cryptography Audits
- Smart Contract Audits
- TCE Audits
