---
title: Glossary
description: A list of specialized or technical Topos terminology and their definitions 
---

# Glossary

The following terms and their definitions clarify specialized or technical aspects of Topos technology.

### AIR Program
The algebraic representation of a statement/relation one wants to prove validity of using a STARK proving system. It can be seen as the translation of a high level relation to a language understandable by the [prover](./glossary.html#prover)/[verifier](./glossary.html#verifier).

### Asymmetric Key Cryptography
The use of different (but mathematically related) keys for encrypting and decrypting data. See also [Public Key Cryptography](./glossary.html#public-key-cryptography).

### Atomic Broadcast
A distributed computing principle ensuring that all participants in a system consistently deliver messages in a specific order. Drawing from the Chandra and Toueg protocol, a consensus-based solution, it operates in synchronized rounds, where each party sends endorsed messages to others. The system collectively decides on the order and validity of these messages, even if some are from malicious sources. By requiring consensus and valid digital endorsements, atomic broadcast guarantees that messages from honest parties are delivered promptly and in a uniform sequence across the network, despite potential interference from adversaries.

<Accordion>
<AccordionItem title="Additional information">

Atomic broadcast ensures messages are delivered in a consistent order among all honest participants. That is, regardless of how messages are sent, all honest parties receive the same set of messages in the same sequence. Additionally, if a corrupted party sends a message, the system decides collectively whether it should be delivered or not. This decision-making aspect requires a consensus mechanism known as Byzantine agreement.

There is more than one algorithm for implementing atomic broadcast. This definition draws inspiration from the Chandra-Toueg algorithm, which requires that all parties participate in synchronized cycles called *rounds*.

In each round, each party endorses a message with its digital signature and sends it to all other parties. Every party then suggests a collection of all messages they've received which have valid signatures. Typically, this will be a list of $N−f$ messages, where $N$ is the total number of parties and $f$ is the maximum number of malicious parties the system can tolerate.

The system ensures that all messages in the suggested collection have valid signatures. Consequently, most of the messages (at least $N − 2f$) are from trustworthy parties. The messages in the approved collection are then arranged in a set sequence and delivered to all parties.

This in turn ensures both liveness and fairness. It means that a message sent by an honest party won't be indefinitely held up by malicious actors, and once a message is known to a certain number of honest parties (specifically, at least $f + 1$) it will be delivered, preventing undue delays.

</AccordionItem>
</Accordion>

### Atomic Snapshot
A shared object utilized by $N$ processes, each of which has a unique location within the object. This location contains records of all successful transfer operations executed by the respective process. Considering each account is controlled by only one process, all transfers from a specific account will be found at its designated location in the atomic snapshot, linked to its owner process.

In simpler terms, imagine the Atomic Snapshot as a shared list of $N$ compartments, where each compartment belongs to a specific process.

See also [Atomic Snapshot memory, Shared-memory model](./glossary.html#atomic-snapshot-memory-shared-memory-model).

### Atomic Snapshot Memory, Shared-memory model
Atomic snapshot memory refers to a communal data storage system. It allows various concurrent processes to save data in a group of shared locations. Unique to this system is the ability to read the entire group's contents in one swift action, known as an atomic scan operation.

<Accordion>
<AccordionItem title="Additional information">

Atomic Snapshot memory behaves like a list or vector of $N$ shared variables. This memory structure allows for two primary actions, *Update* and *Snapshot*:

* *Update* alters the value in a specific compartment or location.
* *Snapshot* provides a view of the entire list, returning its full current state.

<HighlightBox type="tip" title="Further reading">

* [Atomic Snapshots of Shared Memory](https://groups.csail.mit.edu/tds/papers/Shavit/TM-429.pdf)
* [AT2: Asynchronous Trustworthy Transfers](https://arxiv.org/pdf/1812.10844.pdf)

</HighlightBox>

</AccordionItem>
</Accordion>

### BAR Fault Tolerance
A concept in the world of distributed systems that seeks to address the challenges of having nodes with various behaviors. [Byzantine fault tolerance (BFT)](./glossary.html#byzantine-fault-tolerance-bft-) deals with just two types of nodes: faulty (Byzantine) and correct. The BAR model expands on this by introducing three types of nodes: *Byzantine*, *Altruistic*, and *Rational*.

The BAR Fault Tolerance model acknowledges that, in real-world distributed systems, not all nodes can be categorized as "faulty" or "correct." Some nodes might act out of self-interest (rational), while others might consistently do what is expected (altruistic). The BAR model seeks to develop protocols and strategies that ensure system reliability and functionality even when faced with such a diverse set of node behaviors.

<Accordion title="BAR Fault Tolerance - node types">
<AccordionItem title="Byzantine nodes">

Byzantine nodes may deviate arbitrarily from the suggested protocol for any reason. They may be broken (for example, misconfigured, compromised, malfunctioning or misprogrammed) or may just be optimizing for an unknown utility function that differs from the utility function used by altruistic nodes (for instance, ascribing value to harm inflicted on the system or its users).

</AccordionItem>
<AccordionItem title="Altruistic nodes">

Altruistic nodes follow the prescribed protocol exactly. Altruistic nodes may reflect the existence of Good Samaritans and “seed nodes” in real systems. Intuitively, altruistic nodes correspond to correct nodes in the fault-tolerance literature.

</AccordionItem>
<AccordionItem title="Rational nodes">

Rational nodes are self-interested and seek to maximize their benefit according to a known utility function. Rational nodes will deviate from the suggested protocol if and only if doing so increases their net utility from participating in the system. The utility function must account for a node’s costs (for example, computation cycles, storage, network bandwidth, overhead associated with sending and receiving messages, power consumption or threat of financial sanctions) and benefits (for example, access to remote storage, network capacity, or computational cycles) for participating in a system.

</AccordionItem>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

Originally introduced in [BAR Fault Tolerance for Cooperative Services](https://www.cs.cornell.edu/lorenzo/papers/sosp05.pdf).

</HighlightBox>

</AccordionItem>
</Accordion>

### Byzantine Fault Tolerance (BFT)
A protocol in distributed systems designed to handle nodes that behave unpredictably or maliciously, known as Byzantine nodes. BFT ensures system reliability and consensus even when a subset of nodes behaves maliciously.

### Blockchain
A distributed ledger that records totally ordered transactions, linking the records together via cryptographic hashes. Each block contains the transaction data, a timestamp, and a cryptographic hash of the previous block. The inclusion of the hash of the previous block forms a continuous chain, since the data stored in any given block is affected by the data that came before it. Functionally, this makes each block in a blockchain immutable once written, since a block can not be altered without also altering all subsequent blocks.

### Bridge
A bridge is a protocol or a set of smart contracts that enable the transfer of assets, data, or functionality between different blockchain networks, fostering interoperability and allowing users to interact with multiple blockchain ecosystems.

### Certificate
A data structure created by the Sequencer of subnets, including the Topos Subnet, that certifies subnet state transitions. The certificate encapsulates:

1. Metadata to verify the proof of the correct state transition of the [source subnet](./glossary.html#source-subnet).
2. The [target subnet](./glossary.html#target-subnet) list, identifying the intended recipients.

### Collision-Resistant Hash
A cryptographic function that makes it computationally infeasible to find two distinct inputs that produce the same hash output, ensuring data integrity and preventing unauthorized alterations. It is conjectured that collision-resistant hash functions are [resistant](./glossary.html#quantum-resistance) to [quantum computing](./glossary.html#quantum-computing) attacks.

### Consensus Number k
In distributed systems, the consensus number (denoted as *k*) refers to the maximum number of processes that can achieve consensus using a specific synchronization primitive. A primitive with a consensus number of *k* can solve the consensus problem for up to *k* processes but no more. This metric establishes a hierarchy for the power of synchronization primitives, with higher values indicating greater capability to coordinate among multiple processes.

### Consistency Levels
Describes the behavior of a distributed system regarding the visibility and order of updates to a single data item, ensuring that all participants in the system have a coherent view of the data. Also known as a consistency *model*, it provides guarantees on how and when changes made by one participant become visible to others, often balancing between system performance and the predictability of data accesses.

<Accordion>
<AccordionItem title="Additional information">

Further details about consistency models:

<Accordion>
<AccordionItem title="Causal Consistency">

In the causal consistency model, once an updated data version is communicated to a process, the process is guaranteed to not use older versions.

</AccordionItem>
<AccordionItem title="Eventual Consistency">

Eventual consistency is a liveness guarantee: if no new updates are made to an object, at some point in the future it will return the correct value.

</AccordionItem>
<AccordionItem title="Inconsistency Window">

The period between an update and the system guaranteeing the correct value will be returned.

</AccordionItem>
<AccordionItem title="Monotonic Read Consistency">

Similar to causal consistency, but from perspective of the receiving process. Once a process has read a data item, it will never see the older value of that data item.

</AccordionItem>
<AccordionItem title="Monotonic Write Consistency">

Performs writes within a process serially: one write operation must be completed before the next can be started.

</AccordionItem>
<AccordionItem title="Read Level">

The number of nodes in a distributed storage system involved in the reading of a piece of data.

</AccordionItem>
<AccordionItem title="Replica Level">

The number of nodes in a distributed storage system involved in the replication of a piece of data.

</AccordionItem>
<AccordionItem title="Read-your-writes Consistency">

Reads after a write return the updated data.

</AccordionItem>
<AccordionItem title="Session Consistency">

Reads after writes are always correct within a given session.

</AccordionItem>
<AccordionItem title="Strong Consistency">

After an update completes, all further operations correctly use the new value.

</AccordionItem>
<AccordionItem title="Weak Consistency">

Operations after an update completes may not correctly use the new value.

</AccordionItem>
<AccordionItem title="Write Level">

The number of nodes in a distributed storage system involved in the writing of a piece of data.

</AccordionItem>
</Accordion>

</AccordionItem>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

The [Dynamo DB paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) has some great information about consistency models.

See also Consistency levels from Werner Vogel’s [Eventually Consistent](http://delivery.acm.org/10.1145/1440000/1435432/p40-vogels.pdf?ip=67.170.235.99&id=1435432&acc=OPEN&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E6D218144511F3437&__acm__=1565542564_c4a7ccbc0971346102d83294a77ed4a2).

* [Conflict Free Replicated Data Types (CRDTs)](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type):
* **"In partitioned databases, trading some consistency for availability can lead to dramatic improvements in scalability."** [BASE: An Acid Alternative, by Dan Pritchett](https://dl.acm.org/doi/pdf/10.1145/1394127.1394128)
* [Eventually Consistent, by Werner Vogels](https://dl.acm.org/doi/pdf/10.1145/1435417.1435432)
* [lethain.com: Distributed systems vocabulary](https://lethain.com/distributed-systems-vocabulary/)

</HighlightBox>

</AccordionItem>
</Accordion>

### Cross-Subnet Message
A message that is sent between two [subnets](./glossary.html#subnet).

### Delivery
One certificate is referred to as "delivered" from the point of view of one TCE process.

### DevNet
A mostly operational product network for active development and testing of TCE, the Topos Network and the Subnet SDK. Low stability is assumed for this environment. There may be more than one DevNet, such as for fit-for-purpose testing.

### Double Echo
Academic name of the core component of the broadcast implemented by the TCE. In the context of distributed systems, a Double Echo protocol refers to a fault-tolerant broadcasting algorithm designed to handle Byzantine failures and ensure message delivery across all correct processes in the system.

<Accordion>
<AccordionItem title="Double Echo protocol operation">

The protocol operates as follows:

1. The sender process initiates the protocol by broadcasting the message to all other processes.
2. Upon receipt of this initial message, each process responds by sending an "ECHO" message to all processes.
3. Once a process receives an "ECHO" message from a quorum of processes, it escalates its commitment to the message by sending a "READY" message to all processes, indicating that it is prepared to deliver the message.
4. An amplification step is incorporated for the "READY" messages. If a process receives "READY" messages from more than 'f' number of processes, where 'f' is a pre-defined threshold, it then sends a "READY" message to all processes. This step is necessary to satisfy the totality property, ensuring that if any correct process decides to deliver a message then all correct processes eventually decide to deliver the message.

Hence, a Double Echo protocol provides a structured and robust mechanism for managing message broadcasting and agreement in the presence of potential Byzantine failures.

</AccordionItem>
</Accordion>

### Echo
Payload on the TCE that is submitted upon starting the broadcast of one certificate. Participants count the number of `Echo`es that they receive until reaching a threshold in order to switch to the second round with the `Ready` payload.

### Elliptic Curve Cryptography (ECC)
A modern form of [asymmetric cryptography](./glossary.html#asymmetric-key-cryptography) that utilizes the mathematics of elliptic curves to generate key pairs: a private key and a corresponding public key. One advantage of ECC is that it provides the same level of security as traditional methods like RSA but with much shorter key lengths, which makes ECC systems more efficient in terms of speed and the amount of data transmission required. Elliptic Curve Cryptography is known to be susceptible to [quantum](./glossary.html#quantum-computing) attacks.

### Epoch
In Topos, an epoch refers to a continuous sequence of $r$ blocks, denoted as $Ep = {bl_1, bl_2, ... , bl_r}$. The specific number $r$ is a system parameter. Typically, an epoch corresponds to approximately 24 hours.

### Event
An "event" represents a specific action in a process.

<Accordion>
<AccordionItem title="Additional information">

A process, represented by $p$, starts in one configuration and moves to another. This movement is a step.

A step happens in two main parts:

1. A message buffer in the configuration $C$ uses ${\sf receive}(p)$ to obtain a message, which can either be a value from the set $M$ or simply be $\emptyset$.
2. Based on the current state of $p$ and the message it received, $p$ changes its state and sends messages to other processes.

The specifics of this step are always determined by a combination of the process $p$ and the message $m$. This unique combination is what we call an **event**. Thus, there are usually two events: one when the message $m$ is broadcast to process $p$, and the other the moment when message $m$ is delivered to process $p$.

</AccordionItem>
</Accordion>

### Executor Service
An HTTP REST API that accepts requests for transaction executions on any [subnets](./glossary.html#subnet).

### The Fischer-Lynch-Paterson (FLP) Result
Also known as the FLP Impossibility, this theorem establishes that, in an asynchronous system, reaching consensus (ensuring all correct processes converge to the same value) is unattainable if even a single node fails, whether due to a crash or byzantine fault.

While the FLP impossibility theorem establishes fundamental limitations for consensus in asynchronous systems with crash failures, practical systems often navigate around these limitations.

<Accordion title="Additional Information">
<AccordionItem title="Circumvention and mitigation of the FLP theorem">

There are ways to circumvent or mitigate the implications of the FLP theorem by augmenting the basic model. Some common approaches are:

* *Randomization*: Algorithms that introduce randomization can achieve consensus with high probability, even under asynchrony.
* *Failure Detectors*: These provide processes with information about which nodes have potentially failed. While real-world failure detectors might not be perfect, they can be used in combination with consensus algorithms to achieve consensus in asynchronous systems.
* *Weakening Model Assumptions*: Instead of working in a purely asynchronous model, some systems assume partial synchrony. In a partially synchronous system, there are bounds on message delivery time and process steps, but these bounds are not known a priori. The idea is that while the system might behave asynchronously for a time, it will eventually become synchronous.

</AccordionItem>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

* [Impossibility of Distributed Consensus with One Faulty Process](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf)
* [FLP Impossibility & Weakest Failure Detector](http://www.cs.cornell.edu/courses/cs6410/2016fa/slides/18-distributed-systems-flp.pdf)
* [From Distributed Consensus Algorithms to the Blockchain Consensus Mechanism](https://www.alibabacloud.com/blog/from-distributed-consensus-algorithms-to-the-blockchain-consensus-mechanism_595315)

</HighlightBox>

</AccordionItem>
</Accordion>

### FROST
A threshold Schnorr signature scheme, which allows multiple participants of a set to collectively sign a payload, while the signature generated is identical to a regular 1-person Schnorr signature, and this is for any set size and any threshold parameter. See also [ICE-FROST](./glossary.html#ice-frost).

### Harvest and Yield
*Yield* denotes the probability of a system successfully completing a request, often equated with system availability, such as "four-nines availability" signifying a 99.99% success rate. On the other hand, *Harvest* evaluates the completeness of returned data in comparison to the ideal dataset. A system that doesn’t deliver all the data, possibly due to issues like an unavailable node, results in a harvest of less than 100%. These metrics allow for nuanced discussions about the trade-offs in system availability and data completeness.

<Accordion>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

Fox and Brewer introduced the concepts of Harvest and Yield in their work [Harvest Yield, and Scalable Tolerant Systems](https://s3.amazonaws.com/systemsandpapers/papers/FOX_Brewer_99-Harvest_Yield_and_Scalable_Tolerant_Systems.pdf). These concepts provide a nuanced understanding of the CAP theorem by addressing its non-binary properties.

</HighlightBox>

</AccordionItem>
</Accordion>

### Head
Represents the last certificate entry on a certificate stream (certificate stream for both source and target [subnets](./glossary.html#subnet)).

### History
In the context of operations, a history (denoted as $H$) is a sequence that defines a specific order in which operations occurred.

This sequence introduces an irreflexive partial order, represented by $\prec_H$. In this order, one operation $e_0$ is considered to precede another operation $e_1$ if the result of $e_0$ (denoted as $res(e_0)$) comes before the invocation of $e_1$ (denoted as $inv(e_1)$) within the history $H$.

Formally, $e_0 \prec_H e_1$, if $res(e_0)$ precedes $inv(e_1)$ in $H$.

The history represents the observed order of these operations.

### ICE-FROST
Upgrade to the FROST protocol to support cheating participant identifiability (during the key generation, key resharing or signature phase); key generation/resharing robustness (that is, the protocol can continue even with malicious participants); and static keys (permitting a single public key that does not change when the individual secret keys are reshared to another set of participants).

<Accordion title="ICE-FROST: an optional deep dive">
<AccordionItem title="ICE-FROST">

ICE-FROST is an in-house customization of the FROST threshold signature scheme. It allows a non-unary and dynamic set of signers to sign certificates against a static public key.

<HighlightBox type="info" title="Threshold signatures">

A $(t, N)$-threshold signature scheme is a multi-party digital signature protocol such that any honest subset of $N$ signers with cardinality at least $t$ is able to successfully create a valid signature.

</HighlightBox>

A desired property of threshold signature schemes is **robustness** in the sense that the protocol can tolerate cheating of a limited number of participants. A robust scheme will run successfully despite cheating participants if the number of such is below the given limit. If this goal is guaranteed to be attained after at most a bounded number of re-runs of the protocol, we refer to the property as *semi-robustness*. Our customizations augment FROST with robustness in the distributed key generation phase. The robustness is achieved via the exact **identification and exclusion of a cheating entity** during the key generation. Identifying cheaters further can conclude in preventing cheating if suitable punishments are predicted.

The protocol also has two additional important properties that are tailored for our Topos design, namely:

1. Achieving **semi-robustness** during signing by appropriate choice of the set of signers, besides taking advantage of the cheating identification property during key generation.
2. Allowing a blockchain network to distribute a **static long-running verification key** with respect to which different sets of signers can produce signatures. This allows the verification key associated with each subnet to stay static while the set of signers can vary easily. This is a key feature of subnets (that is, dynamic networks whose participating nodes arbitrarily join and leave).

</AccordionItem>
<AccordionItem title="ICE-FROST in Topos">

ICE-FROST is used in Topos for signing certificates. The main purpose of signing is authenticating the subnet creating the certificate and verifying its integrity (that is, ensuring that it was not altered while in transit). The number of signers required to generate a valid signature with ICE-FROST can be freely chosen by the subnet. A malicious party would then need to control more than the threshold to sign a certificate committing to an arbitrary state that honest signers disagree with, or to equivocate on two conflicting certificates.

<HighlightBox type="info" title="Info">

In practice, we expect most subnets to run a BFT consensus mechanism, so we recommend a threshold greater than one-third of the total number of validators.

</HighlightBox>

A greater threshold value increases security at the cost of availability: if there aren't enough honest signers to reach the threshold, then the subnet might be unable to sign the certificate.

When a subnet registration takes place, the initial set of signers runs the initial DKG phase, as a result of which they obtain a static ICE-FROST verification key that is required to verify certificate signatures. This verification key is included in the subnet's registration certificate and remains static for the lifetime of the given subnet. Since the verification key is designed to be static, the redistribution of shares does not change the group signing and verification keys. Note that both the initial and redistribution phases are dealerless.

The generated signature has a format identical to a regular Schnorr signature (even though it is generated by a group of signers instead of individual ones), hence can be verified by any entity capable of verifying Schnorr signatures. Therefore, checking the certificate signature before processing the certificate is very fast and effectively prevents spamming if an adversary sends multiple certificates with invalid signatures.

</AccordionItem>
<AccordionItem title="ICE-FROST protocol outline">

In this section, we will provide an outline of ICE-FROST.

**Schnorr Signature Algorithm**
The Schnorr signature algorithm is a digital signature algorithm. FROST and ICE-FROST are both based on Schnorr, hence we will briefly describe it here.

Schnorr signatures are constructed based on the Sigma protocol structure. Sigma protocols consist of three message transmissions between a prover and a verifier:

1. The prover sends a commitment value to the verifier.
2. The verifier sends a uniformly random challenge to the prover.
3. The prover answers to the challenge using some public function and a witness.

The prover is the signer in the Schnorr signature scheme, and the witness is the secret key held by the signer that is kept secret using the discrete log hardness assumption. The signature scheme is made and used non-interactively using Fiat-Shamir transform which is using the output (digest) of a hash function with the input of the commitment, witness and message instead of the challenge value.

**Distributed Key Generation (DKG): Initial Run**
ICE-FROST distributed key generation protocol is based on the DKG algorithm of Pedersen, which is a distributed secret sharing scheme, constructed over Shamir's Secret Sharing. All participants of the DKG algorithm securely distribute their randomly chosen secrets among other participants. Since no participant is trusted prior to execution of the protocol, a verifiable secret sharing scheme is used that allows participants to verify if the received share is consistent with others. Verifiability is achieved by enforcing each participant to commit to its chosen secret (and to the corresponding polynomial that is used for secret sharing) and broadcasting the commitment values at the beginning of the protocol. After the successful sharing of secrets, participants interpolate their received shares to compute their private signing share. The group's public verification key is calculated using the publicly broadcasted commitments.

To enable cheating identifiability in ICE-FROST, each participant chooses a pair of ephemeral public and private keys for each secret dealing and publishes the public key and proof of knowledge of the corresponding private key. In order to securely send shares to each participant, a Diffie-Hellman (DH) key agreement is run to establish a secret key between the sender and receiver of the given share. This key is used to securely encrypt the share that is sent out to the corresponding receiver. If a participant cheats by sending out an inconsistent share, the receiver will catch it using the initially published commitment. However, since shares are transmitted in the encrypted form, the receiver of the malformed share has to reveal the mutually established DH key, as well as proof of its correctness, to convince other participants that it has received a malformed share. If the receiver lies and accuses an honest participant of sending a malformed share, it will be caught after other participants check its complaint using the revealed DH key.

**Updating Shares**
Participants' shares are updated by running the key update protocol which is a redistribution of secret shares to provide each shareholder with a fresh signing share while allowing new participants to join or the old ones to leave the protocol. Even if the set of participants stays the same, it is recommended to run the key update protocol every once in a while (e.g., every six hours) to maintain the security of distributed keys. To redistribute the secret key, each participant distributes their secret signing share using the described DKG. If required, the set of participants and the scheme's parameters (the threshold and the total number of participants) can be updated during each run of the key update protocol, while still preserving the static key.

**Preprocessing**
As mentioned above, in a Schnorr signature scheme, the signer initially generates a commitment to a random nonce and sends it to the verifier. In a threshold Schnorr signature scheme, the nonce generation (as well as the private/public key generation) should be made distributed such that any set of at least t participants can generate a valid nonce and corresponding commitment. The distributed nonce can be generated by running a separate round of the DKG algorithm. However, in order to avoid adding an extra round to the protocol and achieve a round-optimized protocol, the nonce and its commitment can be generated during a preprocessing round. For this, each participant generates a list of single-use private nonce pairs and corresponding public commitment shares. Each entry of the list will be used for signing one message and once all are used, the preprocessing round will re-run.

**Signing**
A group of signers with at least t members is randomly selected to generate the (t, n)-threshold signature. However, the generation of a valid signature requires the cooperation of at least t honest participants. If a participant cheats during signing and uses an unmatching signing key, it will be detected. At this point, the signing protocol will run from the beginning but exclude the cheating participant. As long as the initially chosen set of signers contains enough honest signers, the signing protocol will successfully generate a valid signature (semi-robustness property). To ensure semi-robustness or achieve it with high probability, a large enough set of signers (or even all of the participants) should be chosen, at the cost of more communication between participants and a heavier protocol.

After the random set of signers is selected, they will fetch each other's commitments that have been published and stored during the preprocessing round. Each participant checks the validity of the obtained values and calculates a binding value to the message and the group of signers. Then, each one of them derives another commitment value that binds the message, the set of signing participants, and each participant's commitment to each signature share. This latter commitment will be used to calculate the group's commitment value. The challenge value of Schnorr's signature will then be generated by applying a hash function on the group's commitment value, public verification key and message. Each participant responds to the challenge, using its committed nonces (from preprocessing) and their signing key share. Every participant then checks the validity of responses and, if they all passed, adds all the responses to generate the group's threshold signature. All honest participants will end up with the same valid signature. Note that if any of the checks during signing fails, the signing phase will have to be re-run from the beginning, excluding the set of discovered malicious signers.

</AccordionItem>
<AccordionItem title="Benefits of ICE-FROST over FROST">

The main benefits of ICE-FROST over its predecessor FROST are:

* Robustness of the key generation phase, meaning that we are guaranteed to obtain a verification key and/or redistribute the shares, without aborting the protocol.
* Providing optional semi-robustness for the signing protocol. Each subnet can trade efficiency with the size of the set of signers for semi-robustness guarantee. The more signers means the heavier protocol but an increased guarantee of successfully generating a valid signature.
* Provable identifiability of cheating entities, who are either sending malformed shares or making false accusations.
* Redistribution feature of shares, which allows the group public key to be static, meaning that it could be used for as long as required by the group.

</AccordionItem>
</Accordion>

### Interoperability
The capability of different blockchain systems to effectively communicate and work together. Each of these systems maintains its own unique distributed ledger. Transactions can be initiated on one blockchain and continue or be verified on another. Moreover, data stored on one blockchain can be accessed, verified and referenced by a different blockchain in a way that ensures both ledgers understand and agree on the meaning of the shared data.

<Accordion>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

See discussion, and the original definition, based on the NIST definition of *blockchain*: [Interoperability of Distributed Systems, by Thomas Hardjon, Alexander Lipton, and Alex Petland](https://wip.mitpress.mit.edu/pub/xo5rqc22#a-design-philosophy-for-blockchains).

</HighlightBox>

</AccordionItem>
</Accordion>

### Linearization
Ensures that operations in a concurrent system appear as if they were executed sequentially, even if they occur simultaneously. It provides an illusion that every operation acts instantaneously between its start and finish, allowing concurrent object operations to be described by pre and post conditions. A system is linearizable when each of its individual objects is linearizable, distinguishing it from properties like sequential consistency. The concept is fundamental to the "C" (consistency) in the CAP Theorem. For a given operation, the linearization point, or the moment it seems to occur atomically, is its critical section. Contrastingly, [Serializability](./glossary.html#serializability)&ast; concerns transactions involving multiple operations over various objects, ensuring they align with a particular serial order.

<Accordion>
<AccordionItem title="Additional Information">

Linearizability is a property that defines correctness with respect to a sequential execution, meaning an operation should seem to take effect instantaneously and adhere to the object's sequential specification. It's a local property, and the concept of linearization can be equated to a legal sequential history.

A linearizable implementation, additionally, preserves the real-time order between operations. Formally, an invocation $o_1,r_1$ precedes an invocation $o_2$ in $H$, denoted $o_1 \prec_H o_2$, if $o_1$ is complete and the corresponding response $r_1$ precedes $o_2$ in $H$. Note that $\prec_H$ stipulates a partial order on invocations in $H$. A linearizable implementation of $T$ ensures that for every history $H$ it produces, there exists a completion $\bar{H}$ and a legal sequential history $S$ such that:

* for all processes $p$, $\bar{H}|p = S|p$ and
* $\prec_H \subseteq \prec_S$

A concurrent system $\{p_1,...,p_n;A_1,...,A_m\}$, where $p_i$ is the $i$-th process and $A_i$ is the $i$-th object, is linearizable if, for each history $H$, there exists a sequential history $S$ such that:

* for all processes $p_i$, $\bar{H}|p_i = S|p_i$ and
* $\prec_H \subseteq \prec_S$

In other words, the history “appears” sequential to each individual process, and this apparent sequential interleaving respects the real-time precedence ordering of operations. Equivalently, each operation appears to take effect instantaneously at some point between its invocation and its response. A concurrent object $A$ is linearizable if, for every history $H$ of every concurrent system $\{p_1,..., p_n; A_1,..., A_j, ..., A_m\}$, $H|A_j$ is linearizable. A linearizable object is thus “equivalent” to a sequential object, and its operations can also be specified by simple pre and post conditions. Henceforth, all objects are assumed to be linearizable. Unlike related correctness conditions such as sequential consistency or strict serializability, linearizability is a local property: a concurrent system is linearizable if and only if each individual object is linearizable. We restrict our attention to linearizable concurrent systems.

</AccordionItem>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

* [Wait-Free Synchronization](http://cs.brown.edu/~mph/Herlihy91/p124-herlihy.pdf)
* [Axioms for Concurrent Objects](https://www.cs.cmu.edu/~wing/publications/HerlihyWing87a.pdf)
* [What is "Linearizability"?](https://stackoverflow.com/questions/9762101/what-is-linearizability)
* [What is linearizability in distributed systems?](https://www.educative.io/answers/what-is-linearizability-in-distributed-systems)
* [Linearizability](https://en.wikipedia.org/wiki/Linearizability)

</HighlightBox>

</AccordionItem>
</Accordion>

### Merkle Tree
A cryptographic data structure that enables efficient commitment and membership verification of large datasets by organizing them into a hierarchical tree-like structure, with each node's value derived from the cryptographic hash of its child nodes. It ensures data integrity and facilitates quick identification of any changes or discrepancies in the dataset.

### Merkle Patricia Trie
A data structure that is used to store a map between arbitrary-length data (keys) and fixed-length values. It is essentially a kind of search tree, and it's used extensively in certain systems (like Ethereum) where a large amount of data needs to be stored, searchable and provable (the Merkle part of the name indicates that each node in the trie is labeled with the hash of the labels or values of its child nodes).

### Message Delivery
Pertains to the rules and guarantees about how messages are delivered among different processes in a distributed system. The three main types of message delivery that you should know about are:

* *Reliable Delivery*: This guarantees that if a message $m$ is successfully delivered to one correct process, it will eventually be delivered by all other correct processes.
* *Total Order Delivery*: This ensures a consistent global order in which messages are delivered. If one correct process delivers message $a$ before message $b$, then all correct processes will deliver $a$ before $b$. That is, there's a universally agreed order: either $a$ comes before $b$ or $b$ comes before $a$.
* *Causal Order Delivery*: The order preserves the sequence of messages based on their cause-and-effect relationship. If a message "$a$" is delivered before message "$b$" is sent, then "$a$" will always precede "$b$". Likewise, if a sender sends message "$b$" before dispatching message "$c$", "$c$" will always come after "$b$".

### Oracle
An oracle is a component that facilitates communication between blockchain networks and external data sources. It provides smart contracts with access to real-world information, events, or conditions that are outside the native blockchain, enabling them to execute decisions based on external data. Oracles are crucial for enhancing the functionality and applicability of smart contracts across multiple real-world use cases.

### plonky2
The proving/verifying backend for the zk-EVM STARK proof, in Rust.

### Polygon Edge
Blockchain framework used as the blockchain component of [subnets](./glossary.html#subnet).

### Poseidon
A hash function tailored for efficient execution within a proving system. Currently used in plonky2 when computing proofs of computational integrity.

### Position
Refers to the certificate's location within a stream, irrespective of whether it is in a [SourceStream](./glossary.html#sourcestream) or a [TargetStream](./glossary.html#targetstream). Its position can be Zero, Head, or any positive integer.

### Process
A series of operations or tasks that a system undertakes. While some may refer to it as a "node," the term "process" provides a more precise description.

* *Benign process*: A process is termed benign when it faithfully adheres to the designated algorithm and can only malfunction by crashing.
* *Correct process*: This is a process that operates as intended, akin to what is termed an "honest node."

### Process Subhistory
A process subhistory, denoted as $H|p$, refers to the specific series of events in a larger [history](./glossary.html#history), $H$, that are associated with the process named $p$.

Two histories, $H$ and $H’$, are considered equivalent if their respective subhistories for every process $p$ are identical, meaning $H|p = H’|p$.

A history $H$ is deemed well-formed when every process subhistory $H|p$ within it follows a sequential order.

<Accordion>
<AccordionItem title="Further reading">

<HighlightBox type="tip" title="Further reading">

[https://www.cs.cmu.edu/~wing/publications/HerlihyWing87a.pdf](https://www.cs.cmu.edu/~wing/publications/HerlihyWing87a.pdf)

</HighlightBox>

</AccordionItem>
</Accordion>

### Prover
The party that generates the proof. They claim to know a secret or a piece of information, and their goal is to convince the [verifier](./glossary.html#verifier) of this knowledge without revealing the information itself.

### Public input
A public variable given to a [verifier](./glossary.html#verifier), which is passed to the verification function along with a zero-knowledge proof. Depending on the underlying statement in which correctness is being proven, public inputs may vary.

### Public Key Cryptography
An [asymmetric cryptographic](./glossary.html#asymmetric-key-cryptography) technique that involves a pair of mathematically related keys: a public key and a private key. The public key, freely shareable, is used to encrypt data, while the corresponding private key is employed for decryption. This approach enables secure communication over unsecured channels, eliminating the need for a pre-shared secret between sender and recipient. Common internet communication protocols like HTTPS and SSL utilize public key encryption through algorithms such as RSA and AES, while blockchains often rely on [Elliptic Curve Cryptography](./glossary.html#elliptic-curve-cryptography).

### Quantum Computing
A field of computation that utilizes the principles of quantum mechanics to perform complex calculations exponentially faster than classical computers, enabling potential breakthroughs in cryptography, optimization and simulation.

### Quantum Resistance
Refers to cryptographic algorithms and protocols designed to withstand attacks from quantum computers, ensuring long-term security for sensitive data and communications even in the presence of powerful quantum adversaries. Also known as **post-quantum cryptography**.

### Quorum
In a crash-fault system, a quorum consists of more than $\frac{N}{2}$ processes. It ensures that any two quorums will have at least one process in common. For more complex systems with arbitrary faults (Byzantine systems), a Byzantine quorum, designed to tolerate f faults, includes over $\frac{(N+f)}{2}$ processes. Two Byzantine quorums will always overlap with at least one correct process. Notably, to ensure reliability in algorithms that tolerate Byzantine faults, fewer than $f<\frac{N}{3}$ processes should fail.

<Accordion>
<AccordionItem title="Additional Information">
A quorum in a system with $N$ crash-fault processes abstractions is any majority of processes i.e. any set of more than $\frac{N}{2}$ processes (equivalently, any set of $\lceil \frac{N+1}{2} \rceil$ or more processes).

Several algorithms rely on quorums and exploit the fact that every two quorums overlap in at least one process. Note that even if $f < \frac{N}{2}$ processes fail by crashing, there is always at least one quorum of noncrashed processes in such systems.

In a system consisting of arbitrary-fault process abstractions, two majority quorums may not intersect in a correct process. A Byzantine quorum tolerating $f$ faults is a set of more than $\frac{(N+f)}{2}$ processes (equivalently, any set of $\lceil \frac{N+f+1}{2} \rceil$ or more processes). Two Byzantine quorums always overlap in at least one correct process.

To see why this is the case, note that in any Byzantine quorum, there might be $f$ Byzantine processes. Every Byzantine quorum contains, thus, more than $\frac{N+f}{2}-f = \frac{N-f}{2}$ correct processes. Two disjoint Byzantine quorums together would have more than $N-f$ correct members. But there are only $N-f$ correct processes; hence, one correct process must occur in both Byzantine quorums.

Algorithms that rely on Byzantine quorums often need to make progress after obtaining some message from a Byzantine quorum of processes. Because up to $f$ faulty processes may not respond, there must exist at least a Byzantine quorum of correct processes in the system, from which the desired response eventually arrives.

This condition is satisfied only when $N-f > \frac{N+f}{2}$, or equivalently when $N>3f$. Therefore, algorithms tolerating Byzantine faults usually require that only $f<\frac{N}{3}$ processes may fail.

<HighlightBox type="tip" title="Further reading">

Definition from [Introduction to Reliable and Secure Distributed Programming](https://www.amazon.com/Introduction-Reliable-Secure-Distributed-Programming-ebook/dp/B008R61LBG).

</HighlightBox>

</AccordionItem>
</Accordion>

### Range Proof
A zero-knowledge range proof is a cryptographic protocol that enables a [prover](./glossary.html#prover) to demonstrate knowledge of a value within a specific range to a [verifier](./glossary.html#verifier) without revealing the exact value itself.

### Sequencer
Refers to the actor(s) orchestrating the streams between the inside and the outside of [subnets](./glossary.html#subnet). They create, fetch and propagate certificates from and to the TCE.

### Serializability
Serializability refers to the property of a transaction schedule in which the outcome of transactions, when executed concurrently, is the same as if they had been executed one after another without any overlap in time.

In simpler terms, it ensures that even when multiple transactions are executed simultaneously, the end result is as if they were executed in a specific order, one at a time.

See also [Linearizability](./glossary.html#linearizability).

### Site Autonomy

Site autonomy means that each server participating in a distributed database is administered independently from all other databases. Although several databases can work together, each database is a separate repository of data that is managed individually.

<Accordion>
<AccordionItem title="Additional Information">

Some of the benefits of site autonomy in an distributed database include:

* Nodes of the system can mirror the logical organization of companies or groups that need to maintain independence.
* Local administrators control corresponding local data. Therefore, each database administrator's domain of responsibility is smaller and more manageable.
* Independent failures are less likely to disrupt other nodes of the distributed database. No single database failure need halt all distributed operations or be a performance bottleneck.
* Administrators can recover from isolated system failures independently from other nodes in the system.
* A data dictionary exists for each local database. A global catalog is not necessary to access local data.
* Nodes can upgrade software independently.

<HighlightBox type="tip" title="Further reading">
For a deeper exploration of site autonomy, see [THE ISSUE OF SITE AUTONOMY IN DISTRIBUTED DATABASE ADMINISTRATION](https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1040&context=icis1988).

For additional details about distributed database concepts, see [29 Distributed Database Concepts, by Oracle Corporation](http://pages.di.unipi.it/ghelli/didattica/bdldoc/B19306_01/server.102/b14231/ds_concepts.htm).

</HighlightBox>

</AccordionItem>
</Accordion>

### Source order
In a secure transfer system, a correct process should not accept a transfer, $T$, before accepting all transfers that $T$ depends on. Specifically, transfers originating from the same process, $p$, do not commute. As a result, all correct processes must deliver them in the same order. This property is referred to as the source order.

### Source Subnet
Subnet emitting a certificate.

### State
A "state" denotes a snapshot of all the information contained within a system at a specific moment.

For the TCE, its state is defined by the collection of [certificates](./glossary.html#certificate) delivered by its participants.

In terms of a subnet, the state is a comprehensive structure that does more than just record account details and balances. It also has a machine state capable of executing any machine code. This state evolves from one block to another following a set of pre-defined rules. The Ethereum Virtual Machine (EVM) determines these rules for transitioning between blocks.

### Subnet
A network that is sovereign in execution and performs certificate submissions in order to settle its state and interoperate with other subnets.

### Sybil Attack
A type of security threat in which a single adversary creates multiple fake identities or nodes in a network to subvert the system's functionality or gain a disproportionate influence. Countermeasures, like proof-of-work mining in blockchain systems, require participants to demonstrate resource commitment (e.g., computational power) to verify their legitimacy, thereby deterring the proliferation of fraudulent entities.

### Symmetric Key Cryptography
Encryption scheme where the same key is used to encrypt and decrypt a message. For the same level of security, symmetric key encryption typically requires significantly shorter keys than [asymmetric key cryptography](./glossary.html#asymmetric-key-cryptography).

### Target Subnet
A subnet that is designated to receive cross-subnet messages from a [source subnet](./glossary.html#source-subnet)'s certificate field `target_subnet_list`.

### Testnet
An operational product network for [subnet](./glossary.html#subnet) blockchain builders, dApp developers, TCE node operators, etc, to build and gain experience for growing the ecosystem. Topos releases that are fully qualified with limited exceptions. This environment is assumed to have good stability and limited development-related changes; however, issues may be found in this environment to be addressed before MainNet.

### Threshold Signature
A type of cryptographic scheme that allows a group of parties (for example validators) to collectively generate a single signature for a given message, under the condition that a minimum number of them, a "threshold", agree to sign.

### Topos Cross-Subnet Messaging Protocol
Protocol by which target subnets can trustlessly and securely interpret cross-subnet messages from source subnets and execute requested transactions locally. Subnets are free to implement other specific cross-subnet messaging protocols that are built on top of the UCI and the TCE.

<Accordion>
<AccordionItem title="Topos Cross-Subnet Messaging Protocol functionality">

The requesting user calls a dedicated protocol-level smart contract, the **Topos Core contract**, on the source subnet. Once proven to be part of a verified state transition of the sending subnet, the call is executed on the target subnet.

The Topos Core contract function to call on the source subnet depends on the type of message requested:

**Asset transfer:** An asset is burnt/locked on the source subnet and equivalently minted on the target subnet.

```
transferAsset(
    subnet_id: Identifier of the target subnet,
    tokenAddress: Address of the target token contract,
    recipient_addr: Recipient's address on the target subnet,
    amount: Amount to be transferred
)

```

**Arbitrary contract call:** A contract on the target subnet is called from the source subnet.

```
callArbitraryContract(
    subnet_id: Identifier of the target subnet,
    contract_addr: Address of the smart contract,
    func_name: Name of the function to call,
    func_args: Arguments to pass to the function call
)
```

</AccordionItem>
</Accordion>

### Topos Subnet
A blockchain network designed primarily to manage the registration of [subnets](./glossary.html#subnet) and TCE participants in the ecosystem. Additionally, it is responsible for the management of TOPOS, the native asset of the ecosystem. An integral part of its design is to facilitate on-chain voting, enabling TOPOS token holders to contribute to the development and enhancement of the protocol.

### Topos Subnet Validator
A participant tasked with the generation of blocks on the Topos Subnet. Provided they pledge TOPOS as stake and actively engage in the network operations honestly, validators are rewarded for their contribution.

### topos-sequencer
Software containing the Topos logic of the [subnet](./glossary.html#subnet). Each validator runs this process on the same host machine alongside the blockchain process.

### Transmission Control Engine (TCE)
The TCE is a permissionless network that implements a primitive of reliable broadcast leveraged to order and settle certificates in a more optimal way than under consensus.

### Trie
A tree-like data structure used to efficiently store and retrieve dynamic sets of key-value pairs, where keys are usually strings. It optimizes search operations by sharing common prefixes among keys. In the Topos context, this will typically refer to a [Merkle Patricia Trie](./glossary.html#merkle-patricia-trie).

### Trusted Setup Ceremony
A procedure to generate public parameters, known as Common Reference String (CRS), for a cryptographic protocol in such a way that no single party gains enough information to cheat the system. These parameters are usually generated jointly by multiple participants, and each participant contributes some randomness to the process. This is meant to ensure that even if some of the participants are dishonest or compromised, the overall system remains secure as long as at least one participant acts honestly. Once the CRS has been created, the [prover](./glossary.html#prover) and the [verifier](./glossary.html#verifier) will both use it to, respectively, generate and verify proofs.

<HighlightBox type="tip" title="Note">

A trusted setup is often seen as a drawback in cryptographic protocols that require it because any flaw in the setup could compromise the security or privacy of the entire system. If the initial setup isn't done correctly or securely, or if it's performed by a single trusted entity that later becomes compromised, the integrity of the system can be undermined.

</HighlightBox>

### Verifier
The party that checks a proof. Their goal is to be convinced that the [prover](./glossary.html#prover) knows a secret or piece of information without learning what the information is.

### Wait-free
In the context of shared memory algorithms, an algorithm is described as wait-free if every correct process is guaranteed to complete its operation in a finite number of its own steps, irrespective of the actions or failures of other processes.

In simpler terms, if process $F$ starts an operation, it will finish it within a predictable number of its own atomic steps, no matter what other processes are doing. This assumes that local operations of any process, say $P_1$, and actions on shared objects complete within a known timeframe.
    
<Accordion>
<AccordionItem title="Additional Information">

Wait freedom is not about speed, it is about resiliency.
    
<HighlightBox type="tip" title="Further reading">

[Wait-Free Synchronization](http://cs.brown.edu/~mph/Herlihy91/p124-herlihy.pdf)

</HighlightBox>

</AccordionItem>
</Accordion>

### World State Trie
The Trie in charge of keeping track of the state of all Accounts.

### Zero-knowledge Ethereum Virtual Machine (zkEVM)
A type of virtual machine designed to run smart contract transactions in a manner that is compatible with both the computations of zero-knowledge proofs and the current infrastructure of Ethereum. The zkEVM mirrors the Ethereum setting, effectively integrating the established Ethereum development experience and existing utilities into highly scalable and secure subnets.

### zk-SNARK
Stands for "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge." A non-interactive cryptographic protocol that enables one party (the [prover](./glossary.html#prover)) to prove the validity of a statement to another party (the [verifier](./glossary.html#verifier)) without revealing any information other than that the proof is true. The mathematical basis for zk-SNARK is [elliptic curve cryptography](./glossary.html#elliptic-curve-cryptography), and zk-SNARK requires a [trusted setup(./glossary.html#trusted-setup)].

### zk-STARK
Stands for "Zero-Knowledge Scalable Transparent Argument of Knowledge." Similar to the zk-SNARK, it is a non-interactive cryptographic protocol that enables one party (the [prover](./glossary.html#prover)) to prove the validity of a statement to another party (the [verifier](./glossary.html#verifier)) without revealing any information other than that the proof is true. The mathematical basis for a zk-STARK is [collision-resistant hash functions](./glossary.html#collision-resistant-hash), and zk-STARK does not require a [trusted setup](./glossary.html#trusted-setup). zk-STARK proofs are larger than zk-SNARK proofs, but it is less computationally demanding to verify them, making them more scalable.
