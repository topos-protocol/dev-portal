---
title: Add Topos and Incal to Metamask
description: Before working with the Topos Testnet, you need to tell your Metamask Wallet about the subnets
---

# Add Topos and Incal to Metamask

In order to work with the Topos Testnet, you need to tell your wallet about the subnets. We currently recommend [MetaMask](https://metamask.io/download/) as the wallet of choice for the Topos Testnet. If you do not already have it installed, please [download](https://metamask.io/download/) and install it.

## Add Topos to Metamask

<Steps>
<StepItem>
Once you have installed MetaMask, you will need to add the Topos subnet to it. To do this, open the MetaMask extension and click on the Networks dropdown.

![MetaMask Networks Dropdown](/images/metamask-networks-dropdown.png)

Then click on the "Add Network" button.
</StepItem>
<StepItem>
![MetaMask Add Network](/images/metamask-add-network.png)

Your browser will open an a MetaMask interface to add a new network. From that page, select the "Add a network manually" button.
</StepItem>
<StepItem>
![MetaMask Add Topos](/images/metamask-add-topos.png)

Then enter the following information and press the "Save" button:

- Network Name: Topos
- New RPC URL: https://rpc.topos-subnet.testnet-1.topos.technology
- Chain ID: 2359
- Currency Symbol: TOPOS
- Block Explorer URL: https://explorer.testnet-1.topos.technology

![Topos Added Successfully](/images/metamask-topos-added.png)

</StepItem>
</Steps>

## Add Incal to Metamask

To add Incal to Metamask, you will need to repeat the process above, but with the following information:

![MetaMask Add Incal](/images/metamask-add-incal.png)

- Network Name: Incal
- New RPC URL: https://rpc.incal.testnet-1.topos.technology
- Chain ID: 2360
- Currency Symbol: INCA
- Block Explorer URL: https://explorer.testnet-1.topos.technology

## Add Funds with the Faucet

Congratulations! You have successfully added the Topos and Incal subnets to your MetaMask wallet. Now you can add funds to your wallet by using the [Topos Faucet](https://faucet.testnet-1.topos.technology/). 

![Topos Faucet](/images/topos-faucet.png)

Enter your wallet address (from MetaMask) and click the "Send" button. You should see a confirmation message that your funds have been sent, and moments later, the balance should update in your MetaMask wallet.

You can request funds from the faucet once every 24 hours, and given the minimal (or zero) gas fees on the testnet, you should have plenty of funds to experiment with.
