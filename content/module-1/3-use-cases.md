---
title: Use cases
description: Topos use cases
---

# Use cases

Topos offers powerful capabilities, a unique architecture and novel solutions that address many existing challenges in the blockchain space. Its features make it an attractive platform for a wide range of applications. This section will discuss some potential use cases for which the features and capabilities of Topos can be leveraged to provide distinctive advantages.

From enabling interoperability across diverse decentralized applications (dApps) to facilitating heavy computation within a secure and scalable environment, and even allowing custom logic integration for enhanced flexibility, Topos opens up a new world of possibilities.

As you explore these use cases, keep in mind that the innovative design of Topos means that its potential applications are vast and continually expanding. These are just a few examples of how its unique capabilities can be applied.

The following use cases demonstrate how Topos can revolutionize blockchain applications.

<Accordion>
<AccordionItem title="Interoperable dApps">

Interoperability is a key concern for many dApp developers. A dApp might need to interact with various other applications, tokens and even blockchains to fully provide its services. This interaction with multiple chains often comes with a host of challenges, including differences in protocols, data formats, consensus algorithms and more.

**The Topos solution**

Topos provides an elegant solution to these issues, as it offers an environment where dApps can seamlessly interact with multiple chains. The protocol allows developers to create interoperable dApps that can communicate and transact with other chains without having to deal with the intricacies of each chain.

{/* suggest adding a simple graphic for visualization */}

**The use case**

A decentralized finance (DeFi) platform built on Topos could allow users to interact with different assets that exist on other blockchains, like ERC-20 tokens or even non-fungible tokens (NFTs). A user could potentially lend, borrow, trade and earn a yield on assets from diverse chains, all within a single dApp interface. This level of interoperability opens up new possibilities for dApps, making them more versatile, user-friendly and inclusive of the broader blockchain ecosystem.

</AccordionItem>
<AccordionItem title="Complex multi-chain operations">

With the rising number of blockchain ecosystems, the ability to perform complex operations across multiple chains has become a necessity. This includes operations that require the coordination and interaction of smart contracts on different chains, as well as operations that involve tokens or assets on various blockchains.

{/* suggest adding a simple graphic for visualization */}

**The Topos solution**

Topos facilitates such complex multi-chain operations with its robust protocol. It allows developers to build applications that can perform intricate operations involving multiple chains, thereby expanding the application's potential functionality and reach. It allows this on a base of uniform security, in which all blockspaces are of equal security.

**The use cases**

A prime example of complex multi-chain operations could be a DeFi operation that involves a collateralized loan. In this scenario, a user may want to put up collateral in the form of tokens from one blockchain to secure a loan in tokens from another blockchain. The operation would require reliable communication and transaction across these different chains, ensured by the Topos protocol.

Another example could be a multi-chain game that involves assets (such as in-game items or characters) represented as NFTs on different blockchains. A game built on Topos could allow players to use and trade these assets within the game, irrespective of the blockchain on which the assets originally reside.

<HighlightBox type="info" title="Note">

This support for complex multi-chain operations allows a broader and more intricate set of use cases for dApps, pushing the boundaries of what was believed to be possible in the blockchain space.

</HighlightBox>

</AccordionItem>
<AccordionItem title="Secure applications">

Security is one of the paramount concerns in the realm of blockchain technology and dApps. Applications often require sensitive or private information to function correctly. This demands a platform that guarantees data security while also providing the benefits of blockchain technology.

**The Topos solution**

Topos addresses this need by providing robust security features, particularly through the use of zero-knowledge proofs (ZKPs) and certificates for cross-subnet communication.

<HighlightBox type="info" title="Info">

ZKPs are a cryptographic technique that allows one party to prove to another that they know the value of a specific piece of information _without conveying any other information apart from the fact they know it_.

</HighlightBox>

Topos makes use of ZKPs, particularly with its zkEVM component, to provide a layer of privacy and security that is exceptionally robust. The zkEVM allows computations to be validated off-chain (or on-chain) without needing to reveal the underlying data, making it ideal for applications that handle sensitive information.

Furthermore, the use of certificates in the Topos architecture provides another level of security for cross-chain communications. Certificates are a secure method to confirm that data sent from one subnet to another is accurate and has not been tampered with during transmission.

**The use case**

A healthcare application built on Topos could leverage the zkEVM and certificates to securely handle and transfer sensitive patient data across different systems, ensuring data integrity and patient privacy across systems. Similarly, finance applications could benefit from these secure mechanisms, to both protect personal financial information and preserve the transparency and traceability benefits of blockchain technology.

</AccordionItem>
<AccordionItem title="Customizable logic integration">

In the realm of dApps, applications often require unique logic and operations to function optimally. This is especially true for applications that operate in specialized or niche sectors. Topos provides a flexible and customizable platform that can cater to these unique requirements, making it an ideal choice for developers.

**The Topos solution**

The Topos protocol is designed to be modular and flexible, allowing for the integration of custom logic into the operation of dApps built on its platform. This is made possible through the use of subnets, individual blockchains within the larger Topos network. Each subnet can operate independently with its own consensus mechanism, which enables the subnet to accommodate custom logic specific to a dApp's operations.

{/* suggest adding a simple graphic for visualization */}

**The use case**

A supply chain management dApp might require unique logic to track the movement of goods across multiple stages and parties. With Topos, developers can create a dedicated subnet implementing the custom logic necessary to handle these specific operations, ensuring the dApp functions optimally without having to conform to a one-size-fits-all protocol.

Additionally, the use of the Ethereum Virtual Machine (EVM) adds to the flexibility for customizable logic integration that Topos provides. Given the prominence of EVM in the blockchain space, many developers are already familiar with creating smart contracts using Solidity. This allows them to leverage their existing skills while benefiting from the added features and improvements offered by Topos.

<HighlightBox type="info" title="In summary">

This support for customizable logic integration is a significant advantage for developers who use Topos. It allows them to build dApps that are tailored to their specific needs, providing the flexibility to optimize the performance and efficiency of their applications.

</HighlightBox>

</AccordionItem>
<AccordionItem title="Computation delegation">

Blockchains conventionally offer limited blockspace. This is partly because of the nature of their consensus, in which all validators are supposed to compute all transactions all the time.

However, some dApps may want to run large computations.

**The Topos solution**

The Topos protocol does not mandate the use of blockchains for the state machine in subnets. As long as the subnet conforms to the Universal Certification Interface (UCI), subnet administrators have freedom of choice regarding their state machine.

For instance, a subnet could be running a single EVM with a limited number of stateless smart contracts, and a zkEVM. Both could be highly optimized to the limited number of tasks they can handle.

{/* suggest adding a simple graphic for visualization */}

**The use case**

A DeFi provider wishes to offer a platform for provable Black-Scholes option pricing. They implement it as a number of parallel EVM instances, each with the same single stateless smart contract. The sequencer orchestrates a number of specialized zkEVMs.

The cross-subnet messaging protocol would be the following:

* A cross-subnet message arrives in the _Black-Scholes_ subnet with a transaction's event that has the parameters necessary for the computation.
* After verifying the validity of the message with the relevant certificate, the sequencer launches one of the available EVMs.
* The smart contract computes the option price using the parameters transferred, then emits an `event` with all input and output arguments necessary for identification.
* The sequencer calls one of the zkEVMs to generate a validity proof, includes it in a certificate targeting the origin subnet and then sends it over the TCE.
* Another service then sends the `event` to the origin subnet, where it gets verified against the certificate.

The origin subnet has in effect delegated the computation to another subnet, and received a provably valid computation result. Because all operations are stateless, the subnet can handle computationally expensive operations in parallel, and bundle them in a single certificate.

</AccordionItem>
</Accordion>

# Up next

It is time to take a closer look at the Topos protocol itself.