---
title: Use the Faucet to Get Testnet Tokens
description: In order to interact with the Topos and Incal subnets, tokens are requires in order to pay the minimal gas fees on these testnets. This guide will illustrate how to use the Faucet to get these tokens.
---

# Use the Faucet to Get Testnet Tokens

In order to interact with the Topos and Incal subnets, tokens are required to pay the minimal gas fees on these testnets. A [faucet](https://faucet.testnet-1.topos.technology/) exists to allow developers to access tokens for development purposes.

## Prerequisites

To use the Faucet, you must have an address to send the tokens to. We recommend using MetaMask as your wallet, and suggest that you first follow the guide on how to [add the Topos and Incal subnets to MetaMask](/how-to/add-topos-and-incal-to-metamask.html).

## Use the Faucet

The faucet is a simple web application that allows you to request tokens for a given address. It is located at [https://faucet.testnet-1.topos.technology/](https://faucet.testnet-1.topos.technology/).

<ZoomImage small>
![Topos Faucet](/images/topos-faucet.png)
</ZoomImage>

Enter the address to receive the funds in the `Address` field, and select the subnets to receive funds on.

The faucet limits funding to once per 24 hours, based on the IP address of the requester, so we recommend ensuring that both **Topos** and **Incal** are selected before clicking the `Submit` button. This is less limiting than it may seem, however, as the fees on the testnet are so low that you should have plenty of funds to experiment with from just one request.

If it has been less than 24 hours since the address has requested funds, you will see an error message:

<ZoomImage small>
![Faucet Error](/images/faucet-too-soon-error.png)
</ZoomImage>

If the token allocation is successful, the application will report that:

<ZoomImage small>
![Faucet Success](/images/faucet-success.png)
</ZoomImage>

# Wrapping Up

With tokens for Topos and Incal in your wallet, you are ready to start interacting with the Topos testnet and learning more about the Topos platform. Remember that if you do need more tokens, you can request additional tokens once every 24 hours.