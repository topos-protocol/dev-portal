---
title: Add Topos and Incal to Metamask
description: Before working with the Topos Testnet, you need to tell your Metamask Wallet about the subnets
---

# Add Topos and Incal to Metamask

In order to work with the Topos Testnet, you need to tell your wallet about the subnets. We currently recommend [MetaMask](https://metamask.io/download/) as the wallet of choice for the Topos Testnet. If you do not already have it installed, please [download](https://metamask.io/download/) and install it.

This document will walk you through two different approaches for completing this. The most educational approach is to manually add the subnets to your MetaMask wallet. However, if you prefer, you can follow the procedure to [automatically add the subnets to your wallet](#alternative-method-leverage-the-erc20-messaging-app) using the ERC20 Messaging App.

## Add Topos and Incal to MetaMask Manually

Adding the networks to your MetaMask wallet manually is a useful exercise if you are new to MetaMask and web3 development, as it allows you to better understand the data that underlies the process.

### Add Topos to Metamask

<Steps>
<StepItem>
Once you have installed MetaMask, you will need to add the Topos subnet to it. To do this, open the MetaMask extension and click on the Networks dropdown.

<ZoomImage small>
![MetaMask Networks Dropdown](/images/metamask-networks-dropdown.png)
</ZoomImage>

Then click on the "Add Network" button.
</StepItem>

<StepItem>
<ZoomImage small>
![MetaMask Add Network](/images/metamask-add-network.png)
</ZoomImage>

Your browser will open an a MetaMask interface to add a new network. From that page, select the "Add a network manually" button.
</StepItem>

<StepItem>
<ZoomImage small>
![MetaMask Add Topos](/images/metamask-add-topos.png)
</ZoomImage>

Then enter the following information and press the "Save" button:

- *Network Name*: **Topos**
- *New RPC URL*: **https://rpc.topos-subnet.testnet-1.topos.technology**
- *Chain ID*: **2359**
- *Currency Symbol*: **TOPOS**
- *Block Explorer URL*: **https://explorer.testnet-1.topos.technology**

<ZoomImage small>
![Topos Added Successfully](/images/metamask-topos-added.png)
</ZoomImage>

</StepItem>
</Steps>

### Add Incal to Metamask

To add Incal to Metamask, you will need to repeat the process above, but with the following information:

<ZoomImage small>
![MetaMask Add Incal](/images/metamask-add-incal.png)
</ZoomImage>

- *Network Name*: **Incal**
- *New RPC URL*: **https://rpc.incal.testnet-1.topos.technology**
- *Chain ID*: **2360**
- *Currency Symbol*: **INCA**
- *Block Explorer URL*: **https://explorer.testnet-1.topos.technology**

## Alternative Method -- Leverage the ERC20 Messaging App

As an alternative approach, you can use the [ERC20 Messaging App](https://dapp-frontend-erc20.testnet-1.topos.technology/) to add the Topos and Incal subnets to your MetaMask wallet.

<Steps>

<StepItem>
To do this, first [navigate to the application](https://dapp-frontend-erc20.testnet-1.topos.technology/). You should see a screen like this:

<ZoomImage small>
![ERC20 Messaging App](/images/erc20-messaging-connect-wallet.png)
</ZoomImage>
</StepItem>

<StepItem>
Press the `Connect to MetaMask` button. You should see a MetaMask popup like this:

<ZoomImage small>
![MetaMask Connect](/images/metamask-connect.png)
</ZoomImage>
</StepItem>

<StepItem>
Click `Next` and then `Connect` to the confirmation popup.

<ZoomImage small>
![MetaMask Connect Confirm](/images/metamask-connect-confirm.png)
</ZoomImage>
</StepItem>

<StepItem>
You should see the ERC20 Messaging app page change to reflect your wallet address in the upper right of the page:

<ZoomImage small>
![ERC20 Messaging App Connected](/images/erc20-messaging-connected.png)
</ZoomImage>
</StepItem>

<StepItem>
At this point, selecting a subnet from the `Sending subnet` dropdown will automatically trigger adding that subnet to your MetaMask wallet:

<ZoomImage small>
![ERC20 Messaging App Connected](/images/erc20-metamask-add-topos.png)
</ZoomImage>
</StepItem>

<StepItem>
Scroll down in the popup and click 'Approve'. The network will now be added to your MetaMask wallet. You should do this for both Topos and Incal. Once you have done this for both, opening the MetaMask extension, and clicking on the Networks dropdown should show both subnets:

<ZoomImage small>
![MetaMask Networks Dropdown](/images/erc20-metamask-networks-populated.png)
</ZoomImage>
</StepItem>

</Steps>

# Wrapping Up

At this point, you should have both the Topos and the Incal subnets added to your MetaMask wallet. You will probably need to request tokens from the [Topos Faucet](https://faucet.testnet-1.topos.technology) in order to continue learning and experimenting. You can follow the instructions in our [How to use the Faucet to get Testnet Tokens](/content/how-to/use-the-faucet.html) guide to do this.