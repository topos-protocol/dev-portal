---
title: Introduction
description: Introduction to Topos
---

# Introduction

In this first chapter, you will find useful information regarding Topos and its components, and how you can use it best. This chapter describes the concepts behind Topos and outlines the advantages it brings to web3, in particular when you want to develop smart contracts, build decentralized applications (dApps) or build application-specific blockchains.

## A brief overview of Topos

Whether you're well-versed in web3, just beginning your journey, or a skeptic eager to discover its potential, Topos has something to offer for you. Web3 developers, whether from the Ethereum domain or other popular ecosystems, frequently grapple with inherent platform challenges. A few of these challenges might include:

* High demand on platforms like Ethereum's mainnet often leads to competition for blockspace, a valuable resource, subsequently raising your gas expenses.
* Moving activity onto Layer 2 (L2) blockchains to reduce congestion on a Layer 1 (L1) mainnet might seem like a solution, but eventually you're back to vying for L1 blockspace during L2 state settlements.
* Using compatible sidechains running in parallel with the mainnet might seem tempting, but their security isn't always on par with that of a mainnet like Ethereum due to varying validator systems.
* Creating your own sidechain or an L2 Ethereum-based chain can be overwhelming, especially with the intricate setup of validators and bridges. Moreover, you'll still face the inescapable fact that its security might not match that of others.

<HighlightBox type="info" title="Note">

In standard _layer 1_ and _layer 2_ topologies, validators are typically assigned to a single blockchain.

</HighlightBox>

Different blockchains with different amounts of value at stake create blockspaces with **disparate levels of security**. This generates a problem for applications operating across blockchains: In the same way that a physical chain is only as strong as its weakest link, a dApp is only as secure as the least secure blockspace on which it is deployed. This security inconsistency may cause the dApp's users to cast doubt on the whole application, or in many cases make it fundamentally non-viable.

Multi-chain systems exist that introduce **shared security**, whereby all participating chains (known as _shards_) are validated in turn by the same set of validators. This levels and homogenizes the security guarantees of the participating blockchains. Such systems are casually known as _layer 0_ (L0).

<HighlightBox type="info" title="Info">

Polkadot is an example of this type of multi-chain, shared-security "layer 0" ecosystem.

</HighlightBox>

Unfortunately, such systems **restrict the number of chains** participating in the shared security. As a consequence, participation in a shared security system may hinge on winning a costly auction. Additionally, these systems do not provide cryptographic proofs to attest to the validity (think `1 + 1 = 2`) of each chain's state transitions. Instead, they rely on the honest majority assumption to guarantee the validity of these state transitions.

Topos is a technology created to alleviate these concerns and more. It is the first zkEcosystem (zk as in zero-knowledge) that offers **uniform security** across its shards (called _subnets_), with provable **state transition validity** and **state non-equivocation**.

With Topos you can:

* Launch or scale your dApp on **pre-existing** Topos EVM-based blockchains, called subnets.
* Spawn **your own** EVM-based subnets, and launch or scale your dApp on them.
* Implement new types of cross-subnet messages relevant to your dApp.
* Natively and securely interoperate and compose value with other subnets.
* Enjoy uniform security across your subnets and all other subnets in the ecosystem. Therefore, you can securely send and receive cross-subnet messages to and from any other subnet.
* Keep your subnet's state private even when interoperating with other subnets.

# Up next

In the next section, you will discover how Topos leverages ease of deployment, uniform security, scalability and provable computation to provide a solution to the issues facing blockchain technology.
