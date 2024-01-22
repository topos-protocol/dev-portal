---
title: ERC20 Messaging dApp
description: Test cross-subnet ERC-20 token transfer
---

# ERC20 Messaging dApp

It is time to take your first steps with the Topos Testnet and get familiar with the mechanics of using and developing with Topos. To do so, you will use a basic dApp provided by Topos: the **[Topos ERC20 Messaging dApp](https://dapp-frontend-erc20.testnet-1.topos.technology/)**. It is a sample application that allows you to experience Topos as a user transfering funds from one blockchain to another. Later, you can find out more about the actions that are triggered and executed on the public testnet during your test.

## Visit the ERC20 Messaging dApp

<HighlightBox type="info" title="Note">

Please make sure you have installed [MetaMask](https://metamask.io/download/) before continuing.

</HighlightBox>

With MetaMask installed, you can navigate to [ERC20 Messaging](https://dapp-frontend-erc20.testnet-1.topos.technology/):

You are now going to complete a cross-subnet, fungible token transfer from the Topos Subnet to the Incal subnet.

<Steps>
<StepItem>

First, you must connect MetaMask with the **[Topos ERC20 Messaging dApp](https://dapp-frontend-erc20.testnet-1.topos.technology/)**:

If you have not already done so, you will have to connect the ERC20 Messaging dApp to MetaMask and add the Topos and Incal subnets to your MetaMask wallet. To do this, follow the steps in our [How to add Topos and Incal to MetaMask](/content/how-to/add-topos-and-incal-to-metamask.html#alternative-method-leverage-the-erc20-messaging-app) guide.

If you had previously following that guide, but you had performed the manual procedure, then you will still need to connect the dApp to MetaMask. If the upper right corner of the ERC20 Messaging dApp page looks like this, with a 'Connect to MetaMask' button:

<ZoomImage small>
![dApp first page](./images/erc20index.png)
</ZoomImage>

Then click the 'Connect to MetaMask' button and follow the instructions to connect the dApp to MetaMask.

<ZoomImage small>
![dApp connect with MetaMask 1](./images/erc20connect.png)
</ZoomImage>

<ZoomImage small>
![dApp connect with MetaMask 2](./images/erc20connect2.png)
</ZoomImage>

Once the ERC20 Messaging dApp is displaying your address in the right top corner, the ERC20 dApp is connected to your wallet.
</StepItem>

<StepItem>
Additionally, you will want to have requested tokens from the [Topos Faucet](https://faucet.testnet-1.topos.technology). If you have not done this yet, please follow the instructions in our [How to use the Faucet to get Testnet Tokens](/content/how-to/use-the-faucet.html) guide to do this.
</StepItem>

<StepItem>
Your wallet is connected to the app, and you have some tokens to play with, so now you are ready to transfer some assets from one subnet to the other. To do this, first select the **Incal Subnet** in the dApp:

<ZoomImage small>
![Incal page](./images/sendingincal.png)
</ZoomImage>

</StepItem>
<StepItem>

Register a token, here named `testToken`:

<ZoomImage small>
![Register token](./images/testtokenreg.png)
</ZoomImage>

In order to register tokens on the subnets, you will need to pay fees on both subnets for the token registration (e.g. for the Incal subnet):

<ZoomImage small>
![Pay INCA fee](./images/incafee.png)
</ZoomImage>

</StepItem>
<StepItem>

Repeat these steps for the **Topos Subnet**.

</StepItem>

<StepItem>

With both token setups done, you can try your first cross-subnet token transfer:

<ZoomImage small>
![Incal page](./images/incaltopos.png)
</ZoomImage>

</StepItem>
<StepItem>

The ERC20 Messaging dApp will list the different steps involved in the cross-subnet transfer process:

<ZoomImage small>
![Transaction page](./images/transactionrunning.png)
</ZoomImage>

First, approve the actions:

<ZoomImage small>
![approve transaction](./images/approvetransaction.png)
</ZoomImage>

<HighlightBox type="info" title="Note">

A cross-subnet ERC20 token transfer involves you approving several actions:
1. Make allowance for token burn by sending an **approve** transaction to [the token contract](https://github.com/topos-protocol/topos-smart-contracts/blob/main/contracts/topos-core/BurnableMintableCappedERC20.sol) you deployed during registration of a new token. This step is not always required (for example, if you did not hit the maximum you set in this step during the next step).
2. Burn tokens on the Incal subnet and emit an event by sending a **sendToken** transaction to **ERC20Messaging** contract.

</HighlightBox>

The ERC20 Messaging dApp will wait for the transaction to be executed:

<ZoomImage small>
![Wait for the transaction](./images/waittransaction.png)
</ZoomImage>

It should give you a success message, like the following:

<ZoomImage small>
![Successful page](./images/successedenaincal.png)
</ZoomImage>

</StepItem>
</Steps>

**Congratulations! You have completed your first cross-subnet token transfer.**

<HighlightBox type="alert" title="Troubleshooting">

<Accordion title="Troubleshooting">
<AccordionItem title="Clear MetaMask's activity data">

MetaMask remembers the [nonce](https://ethereum.org/en/developers/docs/transactions/) it used for your last transaction. This is an issue if you `clean` and re-`start` your playground or if the testnet is reset, as transaction nonces have to start from `0` on a new network. Follow [this guideline](https://support.metamask.io/hc/en-us/articles/360015488891-How-to-clear-your-account-activity-reset-account) to reset the nonce.

</AccordionItem>
<AccordionItem title="Disconnect your MetaMask account">

If you need to deep-clean your setup enough, you can disconnect your MetaMask account from the frontend. For information on how to do this this, follow [this guideline](https://support.metamask.io/hc/en-us/articles/360059535551-Disconnect-wallet-from-a-dapp).

</AccordionItem>
<AccordionItem title="Delete the networks from MetaMask">

Networks may change between Playground versions or when the testnet is reset; MetaMask only has a network ID that typically never changes. To remove the Topos and Incal networks from MetaMask, follow [this guideline](https://support.metamask.io/hc/en-us/articles/4502810252059-How-to-remove-networks).

</AccordionItem>
</Accordion>

</HighlightBox>

## Under the hood

The following steps describe what actually happened:

1. The ERC20 Messaging frontend deployed a token contract on each subnet for the token you registered on it.
1. To make a cross-subnet transfer, the dApp submitted a transaction to the Incal subnet to burn the transferred tokens there.
1. Next, the sending subnet (Incal) prepares the input data for the ZK proof and submits it to the prover cluster by way of the Sequencer (for the testnet the prover is not active)
1. The sequencer prepares the Certificate and broadcasts it to the TCE network.
1. In parallel, the ERC20 frontend made a request to the [executor service](https://github.com/topos-protocol/executor-service) containing a Merkle proof of the Incal transaction (proof of inclusion of its receipt in the receipt trie of the certified state transition) and the root of the transaction trie, which is used by the **ERC20Messaging** contract to retrieve the certificate from the **ToposCore** contract.
1. Once the receiving side (the Topos Subnet in this case) has taken delivery of the Certificate from its dedicated TCE node and the context-specific information from the executor service, it can proceed to mint the transferred tokens.

**Note**: In the current iteration of the testnet, no ZK proofs are actually computed and TCE nodes are implemented as part of the Topos Subnet validators.

# Up next

You have invoked your first cross-subnet token transfer with Topos. In the next section, you will use Topos Explorer to see the certificates that were created.
