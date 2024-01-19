---
title: Create your messaging protocol
description: Create your custom messaging protocol
---

# Create your messaging protocol

Developing a custom messaging protocol is in essence about writing a smart contract, in the fashion of **ERC20Messaging**, that 1. inherits **ToposMessaging** to get set and ready with the core functionalities needed for cross-subnet messaging (e.g., emitting a special event to announce a cross-subnet message, verifying a proof of receipt inclusion) on a sending and a receiving subnet, and 2. adds the custom business logic that governs the cross-subnet message execution (e.g., burning and minting an internal ERC20 token in **ERC20Messaging**).

We can see that a messaging protocol developer merely needs to focus on the second point, i.e., writing the protocol custom business logic, and does not have to care about the deeper technical details of validating a cross-subnet message. That's the power offered by the **ToposMessaging** smart contract.

Before we dive into the technical details, let's go over the steps that, from a high-level perspective, compose a messaging protocol flow.

## Messaging protocol flow

From start to end, a messaging protocol walks the following path:

1- An arbitrary business logic is executed on the sending subnet

2- A specific event is emitted on the sending subnet to announce the cross-subnet message

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

Like messaging protocol contracts inheriting it, **ToposMessaging** exposes functionalities that relate either to the sending subnet or the receiving subnet in a cross-subnet messaging flow.

### Sending subnet (1)

- `_emitMessageSentEvent(SubnetId targetSubnetId)`: This function expects a target subnet id which is the id of the receiving subnet, and takes care of emitting the specific event mentioned in Messaging protocol flow, point 2. This event is **ToposCore**'s **CrossSubnetMessageSent** event, which is not defined in **ToposMessaging**, hence the `_emitMessageSentEvent` helper function.

### Receiving subnet (1)

- `execute(uint256[] calldata logIndexes, bytes calldata proofBlob, bytes32 receiptRoot)`: This is the function to be called as part of the transaction mentioned in Messaging protocol flow, point 3.

Let's dive deeper into its signature and implementation.

As you can see, calling the `execute` function, i.e., executing a cross-subnet message, demands an array of log indexes, a proof blob, and a receipt root. 

The `proof` in question is a merkle proof proving the inclusion of a receipt in a certain receipt trie (hence the receipt trie root third argument). That receipt is the one of the first transaction that we have listed above, the one executing on the sending subnet the arbitrary business logic at the origin of the cross-subnet message (Messaging protocol flow, point 1). This receipt plays a critical role in the cross-subnet message execution for it ensures the transaction on the sending subnet was executed correctly and it contains the logs which speak to the business logic of the messaging protocol.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging** emits, on a sending subnet, the following `TokenSent` event to detail which cross-subnet ERC20 transfer was requested:

```
event TokenSent(
    SubnetId indexed targetSubnetId,
    string symbol,
    address tokenAddress,
    address receiver,
    uint256 amount
);
```

By passing the index of the corresponding log in the transaction receipt, the **ERC20Messaging** contract instance on the receiving subnet can retrieve the event log, parse it, and get all the data it needs to execute the ERC20 transfer, i.e., mint the right amount of the right token to the right recipient.

</HighlightBox>

As you can see, the receipt is not itself part of the `execute` function arguments. That is because the receipt is retrieved from the merkle proof (the proof blob argument) as the code that verifies the proof is executed. That code is part of **ToposMessaging**'s code that a messaging protocol inherits (a code that is part of the `execute` function code).

Before yielding the receipt, the very first role of the merkle proof is to allow the messaging protocol smart contract deployed on the receiving subnet to verify that the transaction behind the receipt was part of a certified state transition from the sending subnet. This is possible thanks to the parallel work handled by subnet sequencers and the TCE that verify, broadcast and deliver subnet certificates across the ecosystem. It's the **ToposCore** contract's role to store certificates on-chain. 

Thus, **ToposMessaging** can interact with **ToposCore** to query for the certificate corresponding to a given `receipt trie root` (reminder: certificates contain their related receipt trie root) and verify as part of the `execute` function code that the requested cross-subnet message execution relates to an already verified certificate, ensuring that the origination of the cross-subnet message on the sending subnet is valid.

One extra step in the **ToposMessaging** `execute` function execution is the verification that the cross-subnet message has not already been executed before. For that purpose, **ToposMessaging** stores a map of already executed cross-subnet messages, verifies any cross-subnet message execution request against it, and flag a new request as executed if valid and executed.

Finally, `execute` concludes with the execution of the arbitrary business logic of a messaging protocol (Messaging protocol flow, point 4) by calling the `_execute` function, which we will detail below.

## CustomMessaging

Let's name **CustomMessaging** the custom messaging protocol we're going to develop.

As detailed above, we want **CustomMessaging** to inherit **ToposMessaging**, i.e., `CustomMessaging is ToposMessaging`. Like so, **CustomMessaging** comes with the `_emitMessageSentEvent` and `execute` functions that we introduced before, and should at least implement two extra functions:

1- The function that users will call on the sending subnet to originate a cross-subnet message (introduced in Messaging protocol flow, point 1). This function will at least execute `_emitMessageSentEvent` to announce the cross-subnet message.

2- The `_execute` function, whose signature is defined in **ToposMessaging**'s interface, that will contain the arbitrary business logic to be executed on the receiving subnet (reminder: the `_execute` function is called by the **ToposMessaging**-inherited `execute` function).

Again, we can separate these two functions by the subnet on which they are meant to be executed.

### Sending subnet (2)

The code of the first function is pretty much arbitrary and depends on what you want the messaging protocol to be about, see the **ERC20Messaging** example below.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging** exposes the `sendToken` function, as we have seen before, which:

1- Burns the requested amount of the requested token

2- Emits the **TokenSent** event, i.e., the arbitrary event that carries the messaging protocol specific data used on the receiving subnet to execute the cross-subnet message

3- Emits the **CrossSubnetMessageSent** core event to announce the cross-subnet message

```
function sendToken(SubnetId targetSubnetId, string calldata symbol, address receiver, uint256 amount) external {
    if (_toposCoreAddr.code.length == uint256(0)) revert InvalidToposCore();
    Token memory token = getTokenBySymbol(symbol);
    _burnTokenFrom(msg.sender, symbol, amount);                           // 1- Burn the requested amount of the requested token
    emit TokenSent(targetSubnetId, symbol, token.addr, receiver, amount); // 2- Emit the TokenSent event
    _emitMessageSentEvent(targetSubnetId);                                // 3- Emit the CrossSubnetMessageSent event
}
```

</HighlightBox>

Only the last line that emits the **CrossSubnetMessageEvent** is a requirement for all messaging protocols. So if we were to name the first function of **CustomMessaging** `doSomething`, `doSomething` would have the following structure:

```
function doSomething(SubnetId targetSubnetId, ...otherArgs) external {
    ...                                    // 1- Do something
    ...                                    // 2- Emit an event that describes the something
    _emitMessageSentEvent(targetSubnetId); // 3- Emit the CrossSubnetMessageSent event
}
```

### Receiving subnet (2)

Let's now take a look at the second function (`_execute`) signature:

```
function _execute(
    uint256[] memory logIndexes,
    address[] memory logsAddress,
    bytes[] memory logsData,
    bytes32[][] memory logsTopics,
    SubnetId networkSubnetId
) internal virtual {}
```

As detailed before, this function's signature is defined in **ToposMessaging**'s interface and the function is itself called by **ToposMessaging**'s `execute` function, so as a messaging protocol developer, you need not care about how all these arguments are retrieved. You only need to care about how you use them.

You see that, except `networkSubnetId`, all arguments are data projected against a certain log index.

With `logIndexes`, you can retrieve the index of the logs that semantically will describe the cross-subnet message and how it should be executed on the receiving subnet.

<HighlightBox type="tip" title="Which log indexes should I use?">

Remember that because you use the same messaging protocol contract on the sending and receiving subnets, and you developped that messaging protocol, you know which log leads to what information. 

For example, looking at the code of **ERC20Messaging**, we can see that the `TokenSent` event is sent after a few other events related to the ERC20 allowance and burn operations. To be certain, one can inspect the receipt of a `sendToken` transaction and find the index of the `TokenSent` index.

</HighlightBox>

Let's say that you know that the `doSomething` function introduced in the previous section, when emitting on the sending subnet the event that describes that "something" (point 2), gets that event at index `4` in the transaction receipt. Then, your frontend application (the application that your users use to interact with your dApp/messaging protocol) should pass this index when calling on the receiving subnet the `execute` function (via the first `logIndexes` argument whose value should be `[4]`), which consecutively passes it to the `_execute` function via the argument of the same name.

Let's now say that this event is the first one (and maybe the only one) that your messaging protocol needs in order to execute the cross-subnet message. This translates to `logIndexes[0]` being the `4` index you were interested in. 

<HighlightBox type="tip" title="What if I need multiple logs?">

Should you have other logs needed to decode in order to execute the cross-subnet message, you could have passed their indexes as subsequent values of the `logIndexes` array.

</HighlightBox>


Now that you have retrieved the right log index, you can retrieve the rest of the log's data you are interested in:

```
# pseudo-code
myLogIndex = logIndexes[0] // myLog == 4
logsAddress[myLogIndex]    // This is the address of the contract which emitted that log
logsData[myLogIndex]       // This is the data field of that log
logsTopics[myLogIndex]     // This is the topics field of that log
```

From the address of the contract which emitted the log, you can verify that the address is the one you expected. From the data field, you can retrieve all the data that semantically describe the cross-subnet message. Eventually, from the topics you can retrieve all the indexed arguments of the log.

<HighlightBox type="info" title="Example: ERC20Messaging">

**ERC20Messaging**'s `_execute` function is coded as follows:

```
function _execute(
    uint256[] memory logIndexes,
    address[] memory logsAddress,
    bytes[] memory logsData,
    bytes32[][] memory logsTopics,
    SubnetId networkSubnetId
) internal override {
    uint256 tokenSentEventIndex = logIndexes[0];
    if (logsAddress[tokenSentEventIndex] != address(this)) revert InvalidOriginAddress();

    bytes32 targetSubnetId = logsTopics[tokenSentEventIndex][1];
    if (SubnetId.unwrap(networkSubnetId) != targetSubnetId) revert InvalidSubnetId();

    (string memory symbol, , address receiver, uint256 amount) = abi.decode(
        logsData[tokenSentEventIndex],
        (string, address, address, uint256)
    );
    _mintToken(symbol, receiver, amount);
}
```

<br/>
As we can see, it starts by retrieving the expected index of the `TokenSent` event.

```
uint256 tokenSentEventIndex = logIndexes[0];
```
Again, we know that the event is at index `0` because it is the only event we need to decode the ERC20 transfer that we need to execute on the receiving subnet, and because **ERC20Messaging**'s smart contract and frontend application were developed to work with that event only.

<br/>
Then, from the right index, the address of the contract that emitted the `TokenSent` event is retrieved and compared to the current address (the address of the **ERC20Messaging** smart contract instance being used). This is because **ERC20Messaging** expects all instances of its contract to be deployed at the same address on all subnets.

```
if (logsAddress[tokenSentEventIndex] != address(this)) revert InvalidOriginAddress();
```

<br/>
Next, from the right index and the corresponding array of topics, the target subnet id is retrieved. Index `1` is used because the first topic of an EVM event is the event signature, and the next are the indexed arguments of the event and `targetSubnetId` is the first and only indexed argument of the `TokenSent` event.

```
bytes32 targetSubnetId = logsTopics[tokenSentEventIndex][1];
if (SubnetId.unwrap(networkSubnetId) != targetSubnetId) revert InvalidSubnetId();
```

<br/>
Finally, the data field is decoded and the data to be used to execute the cross-subnet ERC20 transfer is retrieved (token symbol, receiver address, and amount), before the transfer gets executed by minting the token.

```
(string memory symbol, , address receiver, uint256 amount) = abi.decode(
    logsData[tokenSentEventIndex],
    (string, address, address, uint256)
);
_mintToken(symbol, receiver, amount);
```

</HighlightBox>

## Conclusion

You now should have a deep understanding of what messaging protocols are in the Topos ecosystem and how they work. You got to see what **ToposMessaging** is and what functionalities it offers to messaging protocol developers ready to jump into the world of cross-subnet messaging. **ERC20Messaging**, the messaging protocol that we developed and deployed on our different networks, was mentioned many times to illustrate with a concrete example the steps that compose the development and use of a messaging protocol.

The next steps after writing your messaging protocol will be to create a dapp-frontend, if needed, to let your users start using your dApp, and start, if needed too, interacting with the Executor Service to delegate that `execute` function call to it (and prevent your users from paying transaction fees twice).
