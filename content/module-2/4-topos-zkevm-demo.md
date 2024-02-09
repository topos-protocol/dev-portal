---
title: Topos zkEVM Demo
description: Run our zkEVM demo, which lets you run a zkevm locally.
---

# The Topos zkEVM Demo Tool

In addition to the Topos Playground, there is another tool for interacting with Topos locally. You can use the topos-zkevm-demo to experience the power of the Topos zkEVM on your local environment with an all-in-one Command-Line Interface (CLI) to run your own demo scenarios.

### System Requirements

#### Hardware

- Memory: 16GB or more

#### Software

- Linux or MacOS
- [Docker](https://docs.docker.com/get-docker/_) version 17.06.0 or greater
- [Docker Compose](https://docs.docker.com/compose/install/) version 2.0.0 or greater
- [NodeJS](https://nodejs.dev/en/) version 16.0.0 or greater
- [Rust](https://www.rust-lang.org/tools/install) recent nightly (2024)
- Git

### Install / Run the CLI

Depending on your NodeJS environment and preferences, there are several ways to install Topos zkEVM Demo.

Our recommended way is to install the CLI using `npm`:

```bash
$ npm install -g @topos-protocol/topos-zkevm-demo
```

If you are a `yarn` user, you can install the CLI using `yarn`:

```bash
$ yarn global add @topos-protocol/topos-zkevm-demo
```

Alternatively, you can install and run via `npx`:

```bash
$ npx @topos-protocol/topos-zkevm-demo
```

## Demo Walkthrough

Once the CLI is installed, you are ready to run the demo. The following steps will guide you through using the demo CLI to interact with the zkEVM.

<Steps>

<StepItem>
### Verify and install dependencies

The first thing that you will want to do is to run the `topos-zkevm-demo` with the `install` command, which will verify your dependencies and then download all of the other components that are required to run the demo.

Topos zkEVM Demo is built on top of two projects:

- [local-zkevm](https://github.com/topos-protocol/local-zkevm): a setup to run a local development chain along with a [hardhat](https://hardhat.org/) sample project to deploy a demo contract and send transactions
- [zero-bin](https://github.com/topos-protocol/zero-bin): the zk prover/verifier

Both of these will be installed for you.

```bash
$ topos-zkevm-demo install
```

<Gif image="topos-zkevm-demo-install" description="Running the topos-zkevm-demo install command" style={{width: '60%'}} />

<HighlightBox type="tip">
1. You only need to run this command once. Be aware that building the zero-bin project may take a few minutes.
2. The Topos zkEVM Demo follows the [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html). Run `$ topos-zkevm-demo --help` and check the `configuration` section to find the demo root directory, which we will later refer to as `DEMO_ROOT`. In most cases, unless you have altered the `$XDG_DATA_HOME` environment variable, the demo root directory will be `$HOME/.local/share/topos-zkevm-demo`.
</HighlightBox>
</StepItem>

<StepItem>
### Start the Erigon chain

The demo utilizes Erigon, which is an implementation of Ethereum, to provide a local development chain. To start it, run:

```bash
$ topos-zkevm-demo start
```
</StepItem>

<StepItem>
### Execute the demo script

You will find the hardhat sample project in `DEMO_ROOT/topos-zkevm-demo/local-zkevm/sample-hardhat-project` (reminder: find your `DEMO_ROOT` by executing `$ topos-zkevm-demo --help` and referencing the `configuration` section of the help). As detailed above, the project contains a demo contract, and a demo script that deploys the contract and sends transactions to the local development chain.

Optionally, you can replace the contract and the script with your own.

When you are ready to execute the demo script, run:

```bash
$ topos-zkevm-demo execute
```

The command will output whatever is logged in the demo script, which by default is the address of the deployed contract, the hashes of the two transactions that were sent, as well as the block that included them (by default, the script will have the two transactions included in the same block).

For example:

```bash
$ topos-zkevm-demo execute
```

Outputs:
```
> demo
> hardhat run scripts/demo.ts


Contract deployed at: 0x512d5c545fa66BaaA187020381876e1E368b5A08

Deployment transaction: 0x602540bfd101d1b02b160fe1fd84cfdb8b0fa35687fc5adc56592b931174c204

Ketchup transaction: 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130 (inserted in block 4)

Mustard transaction: 0x5d98aba30400f5f0cc9c0f2d34f9f4280ec1fca88b177b3c2251ad1ea31a9af3 (inserted in block 4)
```

<Gif image="topos-zkevm-demo-execute" description="Running the topos-zkevm-demo execute command" style={{width: '60%'}} />

From now on, the rest of the demo scenario will be divided into two roles: the `prover`, and the `verifier`.

<HighlightBox type="tip">
Don't close or clear the terminal window where you ran the `execute` command, as you will need the output of the script to proceed with the next steps.
</HighlightBox>
</StepItem>

<StepItem>
### [Prover] Generate a merkle proof

As a prover, your intention is the following: from the two transactions that are now part of your chain, you want to prove to a `verifier` that one of them is valid, without sharing any details about the other one (about any other transaction in the block).

To achieve this, we need to send two proofs to the `verifier`:

- a **merkle proof**: an inclusion proof of your transaction's receipt in the transaction's block's receipt trie
- a **zk-proof**: a zero-knowledge (zk) validity proof that ensures that the state transition of the block is computationally valid

By verifying the _merkle proof_, the `verifier` can verify that your transaction is part of a greater set of transactions (a set that remains unknown to the `verifier`), and by verifying the `zk-proof`, the `verifier` can ensure that this greater set of transactions is computationally valid. Altogether, the verifier will verify that your transaction is part of a valid block, hence is a valid transaction.

<HighlightBox type="info">
Note: The merkle proof is based on a transaction's receipt instead of the transaction itself (and is verified against a block receipt trie instead of its transaction trie), so that the `verifier` can additionally verify that the transaction was correctly executed as per the code of the destination contract (with the receipt `status`), and retrieve metadata describing that execution (with the receipt logs).
</HighlightBox>

Let's start by generating the merkle proof for your transaction. The `tx_hash` should be a transaction hash, such as the `Ketchup transaction` hash that was output by the `execute` command.

```bash
$ topos-zkevm-demo generate merkle-proof <tx_hash>
```

For example:

```bash
$ topos-zkevm-demo generate merkle-proof 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130
node dist/main generate merkle-proof 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130

> generate-receipt-merkle-proof
> hardhat generate-receipt-merkle-proof 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130


✅ Successfully generated merkle proof for transaction 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130:

0xf851a02d247ca1770e3221e8aecf9d04fc9b6f7ff07361715c71ef8703bf24c7905d4580808080808080a0cfa9df4025f175e0c4338efc950dc2e30214a08e8ba6940226a97fd977b156b08080808080808080,0xf9011130b9010d02f90109018301155cb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0
```

<Gif image="topos-zkevm-demo-generate-merkle-proof" description="Running the topos-zkevm-demo generate merkle proof" style={{width: '60%'}} />

The command outputs the merkle proof as a comma-separated list of hex strings.

<HighlightBox type="info">
Note: When copying the merkle proof, make sure to copy the whole list.
</HighlightBox>

</StepItem>

<StepItem>
### [Prover] Generate a zk-proof

From the number of the block which includes your two transactions (reminder: the block number is output by the [execute](#3-execute-the-demo-script) command), you can generate a zk-proof of the block:

```bash
$ topos-zkevm-demo generate zk-proof <block_number>
```

For example:

```bash
$ topos-zkevm-demo generate zk-proof 4
Proving block 4...

Successfully generated proof for block 4! (proof available at DEMO_ROOT/topos-zkevm-demo/zero-bin/proofs/b00004.zkproof)!
```

<Gif image="topos-zkevm-demo-generate-zk-proof" description="Running the topos-zkevm-demo generate zk proof" style={{width: '60%'}} />

<HighlightBox type="warning">
Depending on the hardware that you are using, generating the zk-proof may take several minutes.
</HighlightBox>

The command outputs the local path to the zk-proof file (`.zkproof` extension). You will need to share this file with the `verifier` in step #7.
</StepItem>

<StepItem>
### [Verifier] Verify the merkle proof

You have switched roles and are now a `verifier` who has been handed a few pieces of data (a transaction hash, a merkle proof, and a zk-proof), and your intention is to verify that the given transaction is a valid one.

You will start by verifying the provided merkle proof.

To do this, you will execute the following command:

```bash
$ topos-zkevm-demo verify merkle-proof <tx_hash> <merkle_root> <receipt_trie_root>
```

You might have seen that when we use the command `verify merkle-proof`, it asks for a `receipt_trie_root` which we haven't talked about yet. Let's clear that up: a merkle proof is basically a way to show that a specific piece of data (the leaf) is part of a larger database (the trie) by using a series of steps (a path) that lead to a single, final piece of information (the trie root). This path is made up of several pieces of data (nodes or hashes) that, when put together in a certain way, create a unique identifier (hash) that matches the trie root. This match proves that the data we started with is definitely in the database. To check if this is true (to verify a merkle proof), you need three things: the starting piece of data (the leaf), the series of steps (the proof), and the final piece of information (the trie root).

<HighlightBox type="info">
The `verify merkle-proof` command internally computes the right leaf for you, from the `tx_hash` that you pass.
</HighlightBox>

So, first thing first, you need to retrieve the receipt trie root:

```bash
$ topos-zkevm-demo util get-receipt-trie-root <tx_hash>
```

For example:

```bash
$ topos-zkevm-demo util get-receipt-trie-root 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130
> get-receipt-trie-root
> hardhat get-receipt-trie-root 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130

0x11ef2192f0c9aa092d69b9acf82085f384f172188cc321da94566dc9d33a3b18
```

<HighlightBox type="info">
Internally, the `util get-receipt-trie-root` command fetches the block which includes the passed transaction hash, and outputs the receipt trie root from its header.
</HighlightBox>

Now, you can verify the merkle proof.

For example:

```bash
$ topos-zkevm-demo verify merkle-proof 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130 0xf851a02d247ca1770e3221e8aecf9d04fc9b6f7ff07361715c71ef8703bf24c7905d4580808080808080a0cfa9df4025f175e0c4338efc950dc2e30214a08e8ba6940226a97fd977b156b08080808080808080,0xf9011130b9010d02f90109018301155cb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0 0x11ef2192f0c9aa092d69b9acf82085f384f172188cc321da94566dc9d33a3b18
Verifying merkle-proof for transaction: 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130


> verify-receipt-merkle-proof
> hardhat verify-receipt-merkle-proof 0x785102ca9881b284588452cd90685d2c713cf61f6e4f3fcc8451bb6f2a571130 0xf851a02d247ca1770e3221e8aecf9d04fc9b6f7ff07361715c71ef8703bf24c7905d4580808080808080a0cfa9df4025f175e0c4338efc950dc2e30214a08e8ba6940226a97fd977b156b08080808080808080,0xf9011130b9010d02f90109018301155cb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0 0x11ef2192f0c9aa092d69b9acf82085f384f172188cc321da94566dc9d33a3b18


✅ Merkle proof has been verified
```

<Gif image="topos-zkevm-demo-verify-merkle-proof" description="Running the topos-zkevm-demo verify merkle proof" style={{width: '60%'}} />

</StepItem>

<StepItem>
### [Verifier] Verify the zk-proof

Now that you have verified that the provided transaction is indeed part of a state transition (a block), you can verify that it is valid by verifying the block's zk-proof:

```bash
$ topos-zkevm-demo verify zk-proof <path_to_zk_proof>
```

For example:

```bash
$ topos-zkevm-demo verify zk-proof DEMO_ROOT/topos-zkevm-demo/zero-bin/proofs/b00004.zkproof
Verifying zk-proof: DEMO_ROOT/topos-zkevm-demo/zero-bin/proofs/b00004.zkproof

✅ DEMO_ROOT/topos-zkevm-demo/zero-bin/proofs/b00004.zkproof has been verified
```

<Gif image="topos-zkevm-demo-verify-zk-proof" description="Running the topos-zkevm-demo verify zk proof" style={{width: '60%'}} />

Congratulations, you have now verified that the provided transaction is valid, with zero knowledge of the other transactions of the block!

</StepItem>
</Steps>

## A few final details

- `zero-bin` parameters have been tailored to function with most of the transactions that are commonly executed on a chain. If you have used your own contract and script in the hardhat sample project, and have faced technical issues with the zk-proof generation, reach out to us on our [Discord](https://discord.gg/zMCqqCbGMV)!
- You may have noticed that, as a `verifier`, you still had to interact with the Erigon chain to retrieve the receipt trie root. This means that you have full access to the chain, which is contradictory with the zero-knowledge aspect of verifying the block zk-proof. This is a shortcoming of Topos zkEVM Demo, and is where, in a real world scenario, the Topos zkEcosystem comes into play, by distributing verified subnet certificates that contain state transitions' zk-proofs and receipt trie roots to any verifiers. Read more about Topos [here](https://docs.topos.technology/content/module-1/4-protocol.html#transmission-control-engine-tce-)!

### A few extra commands

Topos zkEVM Demo comes with a few extra commands that we haven't detailed yet, but that you may find useful:

- `topos-zkevm-demo stop [-p]`: Stop the Erigon chain, optionally purge the chain with the `-p` flag. You can then run `start` and `execute` again.
- `topos-zkevm-demo uninstall`: Uninstall Topos zkEVM Demo by cleaning your file system from the demo projects, shutting down the Erigon chain, etc.
- `topos-zkevm-demo version`: Display Topos zkEVM Demo's version
  
## Conclusion

You have now experienced the power of the Topos zkEVM on your local environment. This walkthrough has walked you through the generation of proofs, and the subsequent verification of those proofs. As mentioned at the start of the walkthrough, if you want to experiment with your own contract and script, you can replace the hardhat sample project in `DEMO_ROOT/topos-zkevm-demo/local-zkevm/sample-hardhat-project` with your own.

# Up Next

In this section, you got to interact with the components that create and verify ZK proofs in the Topos protocol, and in the previous section, which covered the Topos Playground, you were able to see multiple Topos components in action together. One of the components that helps to power the Topos Playground is the Topos CLI. In the next section, you will learn more about the Topos CLI and how to use it.