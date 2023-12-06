---
title: Weak Causal Probabilistic Reliable Broadcast
description: "What is Weak Causal Probabilistic Reliable Broadcast (WCPRB)?"
---

# Weak Causal Probabilistic Reliable Broadcast

The main responsibility of the TCE network is to execute a broadcast primitive named the *Weak Causal Probabilistic Reliable Broadcast* (WCPRB) that propagates and securely delivers certificates across the Topos ecosystem to prevent conflicting certificates.

By its consensusless nature, the WCPRB is a simpler, more efficient and more robust implementation than consensus-based solution, which is important from a security perspective. The protocol is permissionless and allows for dynamic reconfiguration.

The WCPRB exposes the following interface:

* `broadcast(m)`: used by a process inside the system to broadcast a message m.
* `deliver(p,m)`: used by a process inside the system to handle the delivery of a message m from sender p.

And satisfies the following key properties:

*Integrity*: For all processes `p` and message `m`, an honest process executes `deliver(p, m)` at most once and, if `p` is honest, only if `p` executed `broadcast(m)`.

*Validity*: If `p` and `q` are honest and `p` executes `broadcast(m)`, then `q` executes `deliver(p,m)`.

*Agreement*: If `p` and `q` are honest processes and `p` execute `deliver(r,m)`, then `q` executes `deliver(r,m)`.

*Source ordering*: If `p` and `q` are honest processes and both execute `deliver(r,m)` and `deliver(r,m')`, then they do so in the same relative order.

## Setup

To correctly execute the WCPRB protocol, TCE nodes locally hold the following variables:

`history(S_j)`: The local set of accepted incoming and outgoing certificates involving subnet S_j.

`digest(S_i)`: The local set of incoming certificates involving subnet S_i since its last outgoing certificate.

`mempool`: The local set of certificates pending for acceptation (not yet accepted nor included).

<HighlightBox type="tip" title="Tip">
A certificate is incoming if it contains a cross-subnet transaction addressed to the corresponding subnet, and outgoing if produced by the corresponding subnet.
</HighlightBox>

## Sampling

A new TCE node, once it has joined the TCE network, has successfully built three samples of peers:

- An `Echo` sample $\mathcal{E}$ and its associated threshold $E < \vert \mathcal{E} \vert$
- A `Ready` sample $\mathcal{R}$ and its associated threshold $R < \vert \mathcal{R} \vert$
- A `Delivery` sample $\mathcal{D}$ and its associated threshold $D < \vert \mathcal{D} \vert$

Starting from this basis, a TCE node starts exchanging _sample-specific_ subcription messages with its `Echo` and `Ready` peers.

Upon receiving _sample-specific_ subscription messages from other nodes, a TCE node adds the corresponding message senders in new samples in the following manner:

- Senders of `Echo` subscription messages are added to a **new** $\tilde{\mathcal{E}}$ set;
- Senders of `Ready` subscription messages are added to a **new** $\tilde{\mathcal{R}}$ set.

A TCE node interacts with its samples as follows:

- It **only listens for messages** coming from peers in samples $\mathcal{E}$, $\mathcal{R}$, and $\mathcal{D}$;
- It **only sends messages** to peers in sets $\tilde{\mathcal{E}}$ and $\tilde{\mathcal{R}}$.

<HighlightBox type="tip" title="Tip">
In the TCE, the per-node **communication is logarithmic** in the size of the system and the overall communication complexity of the system is quasilinear, which allows the TCE to seamlessly scale to billions of processes.
</HighlightBox>

## Protocol overview

To submit a certificate `Cert`, the subnet broadcasts a message `m = (Cert, digest(S_j))` to the TCE nodes it is connected to. Upon receiving this message, the TCE nodes propagate it to the rest of the TCE network via _gossip_.

<HighlightBox type="tip" title="Reminder">
`digest(S_j)` contains incoming (from the point of view of subnet `S_j`) certificates sent by other subnets since `S_j`'s last certificate.
</HighlightBox>

The [ICE-FROST](/learn/uci/authentication) signed message `m` eventually reaches all the TCE nodes. After a correct node receives `m`, it verifies the message signature and if correct, it sends an `Echo` message to all nodes in its $\tilde{\mathcal{E}}$ set.

Each correct node issues a `Ready` message to all the nodes in $\tilde{\mathcal{R}}$​ if it has received more than $E$ `Echo` (resp. $R$ `Ready`) messages from $\mathcal{E}$ (resp. $\mathcal{R}$).

At this point, the message containing the certificate is yet to be delivered. In order for a correct node to deliver the message, it needs to have received more than $D$ `Ready` messages from its delivery sample $\mathcal{D}$.

Upon delivery, a correct node checks if `m` is well-formed, and then adds it to the pool of messages pending validation `mempool`.

Before applying the certificate from subnet `S_j`​ to its state, a correct TCE node validates the certificate via the **certificate validation function**.

Once a certificate passes validation, the TCE node applies the certificate to its local state. Applying a certificate means that the TCE node adds the certificate `Cert` and its digest `digest(S_j)` to the history of subnet `S_j`​.

<HighlightBox type="tip" title="Amplification step">
Having the ready sample $\mathcal{E}$ is paramount for the **totality property** of the WCPRB, as it creates a feedback loop. Consequently, either all correct processes will eventually deliver `m`, or none of them will.
</HighlightBox>