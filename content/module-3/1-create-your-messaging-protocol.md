---
title: Custom messaging protocol
description: Custom messaging protocol
---

# Custom messaging protocol

Developing a custom messaging protocol is in essence about writing a smart contract, in the fashion of **ERC20Messaging**, that 1. inherits **ToposMessaging** to get set and ready with the core functionalities needed for cross-subnet messaging (e.g., emitting a special event, verifying a proof of receipt inclusion) on a sending and a receiving subnet, and 2. adds the custom business logic that governs the cross-subnet message execution (e.g., burning and minting an internal ERC20 token in the case of **ERC20Messaging**).

We can see that a messaging protocol developer merely needs to focus on the second point, i.e., writing the protocol custom business logic, and does not have to care about the deeper technical details of validating a cross-subnet message. That's the power offered by the **ToposMessaging** smart contract.

Before we dive into the technical details, let's go over the steps that, from a high-level perspective, compose a messaging protocol flow.

## Messaging protocol flow

From start to end, a messaging protocol walks the following path:

1- An arbitrary business logic is executed on the sending subnet

2- A specific event is emitted on the sending subnet in order to announce the cross-subnet message

3- A specific transaction is sent to the receiving subnet in order to validate and execute the cross-subnet message

4- An arbitary business logic is executed on the receiving subnet

As mentioned before, all a messaging protocol developer needs to care about, are points 1. and 4., the rest being inherited for free by **ToposMessaging**.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging**, being a messaging protocol to send ERC20 tokens across subnets, implements the points 1. and 4. as follows:

1- Burn the amount that the caller requested to send to another subnet

4- Verify that the address of the **ERC20Messaging** contract on the sending subnet corresponds to the current one (i.e., on the receiving subnet), verify that the requested receiving subnet is the correct one, retrieve the requested ERC20 token, and finally mint the right amount to the right recipient

</HighlightBox>

Now, we will detail the ToposMessaging interface and its relevant methods for you to start leveraging its power.

## ToposMessaging

Like messaging protocol contracts inheriting it, **ToposMessaging** exposes functionalities that relates either to the sending subnet or the receiving subnet in a cross-subnet messaging flow.

### Sending subnet

- `_emitMessageSentEvent(SubnetId targetSubnetId)`: This function expects a target subnet id which is the id of the receiving subnet, and takes care of emitting the right event mentioned in Messaging protocol flow, point 2. This event is **CrossSubnetMessageSent** and is itself defined in the **ToposCore** contract, which explains why ToposMessaging provides for the `_emitMessageSentEvent` helper function.

### Receiving subnet

- `execute(uint256[] calldata logIndexes, bytes calldata proofBlob, bytes32 receiptRoot)`: This function is the one to be called as part of the transaction mentioned in Messaging protocol flow, point 3.

Let's dive deeper into its signature and implementation.

As you can see, calling the `execute` function, i.e., executing a cross-subnet message, demands an array of log indexes, a proof blob, and a receipt root. 

The `proof` in question is a merkle proof proving the inclusion of a receipt in a certain receipt trie (hence the receipt trie root last argument). That receipt is the one of the first transaction that we have listed above, the one executing on the sending subnet the arbitrary business logic at the origin of the cross-subnet message (Messaging protocol flow, point 1). This receipt plays a critical role in the cross-subnet message execution for it contains the log(s) which speak to the business logic of the messaging protocol.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging** emits the following `TokenSent` event to detail which cross-subnet ERC20 transfer was requested.

```
event TokenSent(
    SubnetId indexed targetSubnetId,
    string symbol,
    address tokenAddress,
    address receiver,
    uint256 amount
);
```

By passing the index of the corresponding log in the transaction receipt, the ERC20Messaging contract instance on the receiving subnet can retrieve the event log, parse it, and get all the data it needs to execute the ERC20 transfer, i.e., mint the right amount of the right token to the right recipient.

</HighlightBox>

As you can see, the receipt is not part of the `execute` function arguments. That is because the receipt is retrieved from the merkle proof (the proof blob argument) as the code that verifies the proof is executed. That code is part of **ToposMessaging**'s code that a messaging protocol inherits (a code that is part of the `execute` function code).

Before yielding the receipt, the very first role of the merkle proof is to allow the messaging protocol smart contract deployed on the receiving subnet to verify that the transaction behind the receipt was part of a certified state transition from the sending subnet. This is possible thanks to the parallel work handled by subnet sequencers and the TCE to verify, broadcast and deliver subnet certificates across the ecosystem. It's the **ToposCore** contract's role to store certificates on-chain. 

Thus, **ToposMessaging** can interact with **ToposCore** to query for the certificate corresponding to a given `receipt trie root` (reminder: certificates contain their related receipt trie root) and verify as part of the `execute` function code that the requested cross-subnet message execution relates to an already verified certificate, ensuring that the origination of the cross-subnet message on the sending subnet is valid.

One extra step in the **ToposMessaging** `execute` function execution is the verification that the cross-subnet message has not already been executed before. For that purpose, **ToposMessaging** stores a map of already executed cross-subnet messages, verifies any cross-subnet message execution request against it, and flag a new request as executed if valid and executed.

Finally, `execute` concludes with the execution of the arbitrary business logic of a messaging protocol by calling its `_execute` function, which we will detail below.

## CustomMessaging

Let's name **CustomMessaging** the custom messaging protocol we're going to develop.

As detailed above, we want **CustomMessaging** to inherit **ToposMessaging**, i.e., `CustomMessaging is ToposMessaging`. Like so, **CustomMessaging** comes with the `_emitMessageSentEvent` and `execute` functions that we introduced before, and should at the very least implement two functions:

1- The function that users will call on the sending subnet to originate a cross-subnet message (introduced in Messaging protocol flow, point 1) by notably calling `_emitMessageSentEvent` to announce the cross-subnet message

2- The `_execute` function that will contain the arbitrary business logic to execute on the receiving subnet (reminder: the `_execute` function is called by the **ToposMessaging**-inherited `execute` function)

The code of the first function is pretty much arbitrary and depends on what you want the messaging protocol to be about, see the **ERC20Messaging** example below.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging** exposed the `sendToken` function, as we have seen before:
1- Burn the requested amount of the requested token

2- Emit the **TokenSent** event, i.e., the arbitrary event that will help the messaging protocol contract on the reeiving subnet know how to execute the cross-subnet message

3- Emit the **CrossSubnetMessageSent** core event to announce the cross-subnet message

```
function sendToken(SubnetId targetSubnetId, string calldata symbol, address receiver, uint256 amount) external {
    if (_toposCoreAddr.code.length == uint256(0)) revert InvalidToposCore();
    Token memory token = getTokenBySymbol(symbol);
    _burnTokenFrom(msg.sender, symbol, amount);  // 1- Burn the requested amount of the requested token
    emit TokenSent(targetSubnetId, symbol, token.addr, receiver, amount); // 2- Emit the TokenSent event
    _emitMessageSentEvent(targetSubnetId); // 3- Emit the CrossSubnetMessageSent event
}
```

</HighlightBox>

We can see that only the last line that emits the **CrossSubnetMessageEvent** is a requirement for all messaging protocols. So if we were to name the first function of **CustomMessaging** `doSomething`, `doSomething` would have the following structure:

```
function doSomething(SubnetId targetSubnetId, ...otherArgs) external {
    // 1- do something
    // 2- emit an event that describes the something
    _emitMessageSentEvent(targetSubnetId); // 3- Emit the CrossSubnetMessageSent event
}
```

