---
title: FAQ
description: Frequently Asked Questions
---

# FAQ


<Accordion>
<AccordionItem title="What Wallet do I need to use?">
Since subnets such as the Topos Subnet are Ethereum-compatible based on Polygon Edge, any Ethereum-compatible wallet such as Metamask will work. We suggest using Metamask for the Topos testnet as shown in our documentation: [https://docs.topos.technology/content/module-2/](https://docs.topos.technology/content/module-2/)
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="What is the difference between an Avalanche subnet and a subnet in the Topos ecosystem?">
One thing they have in common is that a subnet in both is a sovereign network that defines its own rules regarding its membership, token economics, and execution. However, from that point, they diverge with numerous differences and they should not be considered equivalent.

In Topos, a subnet may or may not be a blockchain. It may define its own execution and consensus rules, is secured through Uniform Security (which is a common privacy-preserving settlement enforced through cryptographic security), and there is no requirement for subnets to provide validation (security and consensus) for the Transmission Control Engine (TCE) network or Topos Subnet. For that matter, Uniform Security is enabled through the Topos certificate containing a zero-knowledge proof computation which allows for verification while preserving privacy.

In Avalanche, a subnet is a blockchain secured by economic security through validators. The validators are also required to validate for (enhance the security of) Avalanche's primary network including the Platform Chain (P-Chain), Contract Chain (C-Chain), and Exchange Chain (X-Chain). Using validators this way means privacy cannot be preserved because every validatory must have access to all the transactions to validate the block. In addition, the primary network does not provide validation back to the other subnets, thus it is not providing the same security back to other subnets. In this configuration, Avalanche subnets are sovereign with respect to settlement as well as execution.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Is Topos a blockchain?">
Mostly no. The Topos protocol and ecosystem consist of a reliable broadcast network called the Transmission Control Engine (TCE) and subnets which participate by sharing messages that conform to the Universal Certificate Interface (UCI) called "certificates" on the TCE network.

The TCE network is not a blockchain and does not perform consensus. Instead, it implements a weak causal probabilistic reliable broadcast primitive that allows for concurrent processing and far greater scalability than consensus allows for.

The subnets can be a blockchains, and most probably will be blockchains, but the only real requirement is that they conform to the UCI. This makes it possible to create subnets from things such as legacy systems and databases.

One of the subnets happens is the Topos Subnet, a blockchain used to register subnets and TCE nodes. This subnet serves a specific purpose in the ecosystem, but it is only one component of the Topos Ecosystem, and only the TCE network broadcasts and verifies certificates.
</AccordionItem>
</Accordion> 

<Accordion>
<AccordionItem title="How can I try out Topos?">
We have two ways for you to do this currently. First, we have the Topos Playground, which is a way for you to run Topos entirely on your local machine. To do this, just install the official Topos Playground from [https://github.com/topos-protocol/topos-playground](https://github.com/topos-protocol/topos-playground). There is also an unofficial implementation of the playground, available as a single downloadable binary, from [https://github.com/wyhaines/topos-playground.cr/releases](https://github.com/wyhaines/topos-playground.cr/releases).

In addition, we have a public TestNet available for developers to explore and to build on. Please refer to our simple walkthrough documentation on how to start your journey with Topos here: https://docs.topos.technology/content/module-2/
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Are there validator incentives on the Topos testnet?">
There are currently no validator incentives on the Topos testnet.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Where do I get TOPOS tokens for the testnet?">
You can get TOPOS tokens for the testnet from the official [faucet](https://faucet.testnet-1.topos.technology). This and other important network addresses can be found in our [developer documentation](https://docs.topos.technology/content/topos-reference/network.html).
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="The Topos protocol is currently in the testnet phase. When is the mainnet launch date?">
The mainnet launch of the Topos protocol is expected in 2024.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="What is the difference between Topos Messaging and trustless bridges: light clients, IBC, zkIBC...">
"Trustless" is a marketing friendly way of saying "trust minimized" - if you care about security, it has been demonstrated in research that there must be some trust.

That aside: in the case of SNARKS and Light Clients (including IBC) for bridging, they rely on the Honest majority assumption - trusting enough the nodes of the participating parties - that they are truthful.

While they have eliminated many of the risks associated with trusted bridges, there is still a risk regarding equivocation. For example, a potential attack, a non-honest chain signs and provides a fake block header to the destination chain such that the light client on the destination chain can validate a transaction that never happened. 
 
In the Topos Messaging example, the pattern of burning (or locking) and then providing a proof to the target subnet to mint is very similar to the trustless light clients/SNARKs, EXCEPT, in the Topos Protocol, the TCE specifically protects against equivocation; thus, minimizing trust even further and providing even greater safety.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Is a subnet a blockchain? Why call it a subnet and not a blockchain?">
Subnets do not need to be a blockchain. They only need to conform to the Universal Certificate Interface (UCI) requirements. Thus, calling it a "blockchain" in the official documentation would be misleading.

However, for simplicity purposes, and in terms of the initial subnets when launching the network, you can think of it as a blockchain.

As a start-up, we needed to pick a point to start with. In this respect, we created the first Subnet Development Kit based on a Polygon Edge blockchain. Longer term, there is potential for other blockchains and non-blockchain offerings.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Is a special programming language required for smart contracts?">
An EVM compatible smart contract language, such as Solidity or Vyper, is required for smart contracts on the Topos subnet. Solidity is the preferred language.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="What is the Topos Subnet? How is it different from other subnets?">
The Topos Subnet is a subnet like any other subnet except it has some services such as smart contracts and rewards for enabling the Topos Protocol.

In that sense, the Topos Subnet is a special subnet that holds a core role in the Topos ecosystem: It handles the registration of the ecosystem actors (subnets and TCE participants), manages the TOPOS native asset, and allows for the governance of the protocol through on-chain voting, such that TOPOS token holders will have the ability to participate in future protocol improvements.

[https://docs.toposware.com/learn/subnets/topos-subnet](https://docs.toposware.com/learn/subnets/topos-subnet)
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="What is the difference between a validator and a verifier?">
To some, these words could be interchangeable in the web3 world and they would probably be technically correct. 

However, in web3 / blockchains, a validator is the terminology given for a node that participates in the consensus by ensuring security (typically economic security) and confirming the total ordering of transactions in a block. 

Re-using that term in web3 for zkp seems to confuse expectations.

A "verifier" can be used in two contexts. For zero-knowledge proofs (zkp), there is a prover that generates the proof and a verifier that can verify the proofs. In the second case, a verifier can be a component performing verification checks. For example, a Topos TCE node may verify the correctness of a certificate such as comparing it with the previous state root as well as applying the zkp verifier to confirm the zero-knowledge proof (containing the STARK). In this case, the TCE node is both a verifier and contains a zkp verifier. In both cases, the verifier confirms correctness computationally and is neither tied to economic security nor consensus.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Is Topos a bridge?">
There are many ways to transport, message, teleport, warp, or otherwise move an asset (or remotely invoke a transaction) - In a classic sense, a bridge happens to be one specific way to do it and there are many others. In this sense, no, the Topos protocol is not a bridge. However, some people consider bridges and interoperability between blockchains to be one and the same, then in that case, one would consider Topos to be a bridge.

We would define a bridge as follows: A Bridge is enabling interoperability between completely sovereign blockchains in both execution and settlement.

In a multichain ecosystem, interoperability can be achieved between sets of sovereign blockchains with respect to execution but not settlement.  Thus, we would not call this type of interoperability a bridge.

The Topos Bridging example built on top of the Topos Protocol provides a trustless means for claiming an asset or executing a command on a target subnet with computational (cryptographic) proof combined with a common settlement (on the Topos TCE) with proof of consensus from the originating subnet. In this sense, it can provide the results of a bridge with much greater security. The protocol also provides properties such as Uniform Security that benefit interoperability partially by enforcing the common settlement and drives consist quality of blockspace across the subnets but exist independently of it.

Another laymen's way to look if it is a bridge or not: one major difference is that bridges typically connect peer-to-peer or alternately a peer to a hub/router to the target peer to move a transaction from one blockchain island to another, while Topos uses a broadcast network to share state validity and cryptographic proof for many transactions across a network ecosystem.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="What toolchain should be used to deploy contracts to Topos?">
Since the Topos subnet is itself an EVM-compatible blockchain, you can use any toolchain that supports EVM-compatible blockchains. We recommend using Hardhat, which is a very popular development environment for EVM smart contracts. You can find out more about it here: [https://hardhat.org/](https://hardhat.org/)
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Can I deploy my own subnet to the Topos Ecosystem?">
This capability is part of the full suite of capabilities that Topos will provide. It has not yet been released to the Topos testnet, but it is under development and it will be released in the future.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="Can I call arbitrary smart contracts between Topos Subnets?">
This capability is part of the full suite of capabilities that Topos will provide. It has not yet been released to the Topos testnet, but it is under development and it will be released in the future.
</AccordionItem>
</Accordion>

<Accordion>
<AccordionItem title="How do I write Zero-Knowledge Proofs with Topos?">
You don't. This is one of the things that makes Topos different. In Topos, each subnet creates ZK proofs automatically to prove the state transitions on the subnet. This is a feature of the full Topos ecosystem, and it does not require that developers themselves write proofs.
</AccordionItem>
</Accordion>
