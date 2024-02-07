---
title: Deploy a Contract to Topos (or Incal)
description: Learn how to deploy a smart contract to a subnet in the Topis ecosystem, such as the Topos or Incal subnets.
---

# Deploy a Contract to a Topos Subnet

The Topos Ecosystem is composed of subnets which, typically, are EVM compatible blockchains. While there are other moving parts to Topos, such as the creation of Certificates, the TCE, and ZK proofs, deploying contracts to one of these subnets is a straightforward and unsurprising procedure.

The typical language for smart contract development on the EVM is [Solidity](https://docs.soliditylang.org/en/latest). If you are new to Solidity, it is a compiled, object-oriented language for writing programs, called _smart contracts_, which run on the EVM. If this is your first time learning about Solidity, consider reading through [this introduction](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html) before continuing.

Deploying a contract to an EVM, at its core, involves the following steps:

1. Write the contract (in Solidity).
1. Ideally, test your contract before deploying it to a live network.
1. Upload the compiled contract to an RPC endpoint for the network that you want to deploy it to.
1. Pay the gas fee for deploying the contract.
1. Interact with the contract.

There are multiple popular toolchains thar are available to help with smart contract development, testing, and deployment. A few of these are:

1. [Hardhat](https://hardhat.org/) -- Hardhat is an open source toolchain, written in Typescript, which provides a very complete environment for smart contract development, testing, and deployment. 
1. [Foundry](https://book.getfoundry.sh/) -- Foundry is also an open source toolkit, written in Rust, for smart contract development, testing, and deployment.
1. [Remix IDE](https://remix-project.org/) -- Remix is a collection of tools that provide a complete, GUI based environment for working with smart contracts. In addition to the standalone IDE and the VSCode plugin, it also provides a fully functional development environment running right inside your web browser.

In this guide, we will walk through the process of deploying a simple contract to the Topos testnet. We will use the [Remix IDE](https://remix.ethereum.org) to write, compile, and deploy the contract. It is especially convenient for learning Solidity, and for simple experiments with contract because it takes care of many of the more complicated aspects of deployment, allowing a person to just focus on writing, testing, and deploying their code.

## The Contract

If you are experienced with Solidity, feel free to skip ahead to [Deploy to Topos or Incal](#deploying-to-topos-or-incal-). If you are new to Solidity, however, let's start by writing a simple contract.

Before you deploy a contract, you must write a contract. At a minimum, a Solidity contract will have a license declaration in the first line, followed by a `pragma` declaration indicating what language versions are appropriate for the contract code, followed by a contract. The code below represents a minimal contract, which can be compiled, and can be deployed, but which does not actually do anything.

<GitHubBlock language="solidity" org="topos-protocol" repo="example-code-depot" path="/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-1.sol" lines="1..5" />

[Launch a Remix IDE with this code](https://remix.ethereum.org/topos-protocol/example-code-depot/blob/main/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-1.sol)

We want a contract that is interactive and has some simple capability after it is deployed, however. So let's modify this contract to add storage for a `string`, and a function which can set the data on this string.

<GitHubBlock language="solidity" org="topos-protocol" repo="example-code-depot" path="/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-2.sol" lines="1..10" highlights="5..9" />

[Launch a Remix IDE with this code](https://remix.ethereum.org/topos-protocol/example-code-depot/blob/main/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-2.sol)

This contract can now do something. If you click on the link above, to the Remix IDE, it will open this code into an editor.

<ZoomImage small>
![Remix IDE Compilation Successful](/images/remix-compilation-successful.png)
</ZoomImage>

On the left side of the IDE, just like in the image, you should see a green checkmark, and if you mouse over it, a tooltip will appear to tell you that compilation was successful. This means that you could deploy this contract!

Before deploying to a live network, even a testnet, however, it is a good idea to do some simple testing of the contract. Below the icon with the green checkmark is another icon that, when you mouse over it, will say `Deploy & run transactions`. Click on this icon to open the deployment panel.

<ZoomImage small>
![Remix IDE Deploy Icon](/images/remix-deploy-icon.png)
</ZoomImage>

The panel that comes up will look something like this:

<ZoomImage small>
![Remix IDE Deploy Icon](/images/remix-deploy-panel.png)
</ZoomImage>

If it is not already selected, click on the dropdown below _ENVIRONMENT_, and select `Remix VM (Shanghai)`. This is a purely in-browser EVM managed by the IDE, which makes it ideal for basic testing and debugging, since the contract never leaves your browser.

To deploy your contract to this in-browser EVM, press the orange `Deploy` button.

If it worked, the bottom of your IDE window should show something like this:

<ZoomImage small>
![Remix IDE Deploy Success](/images/remix-deploy-success.png)
</ZoomImage>

And at the bottom of the _Deploy & Run Transactions_ panel, you should see something like this:

<ZoomImage small>
![Remix IDE Deploy Success](/images/remix-deployed-contracts.png)
</ZoomImage>

Click on the line that reads `Memory at 0X...`

<ZoomImage small>
![Remix IDE Interact with Contract](/images/remix-interact-with-contract.png)
</ZoomImage> 

If you type something in to the input box next to the orange _store_ button, and then press that _store_ button, you should see a new line with a new green checkmark appear at the bottom of your IDE window, indicating that the transaction was successful. Your contract successfully ran and it stored that string.

Storing a string like this is potentially problematic, however, as a string in Solidity can have any size. This means that if this contract were called on a production network, and a large string were passed into it, the gas costs could be quite high. To prevent this, let's add a line to the contract that restricts it to strings that are less than 256 bytes in length.

<GitHubBlock language="solidity" org="topos-protocol" repo="example-code-depot" path="/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-3.sol" lines="1..11" highlights="8" />

[Launch a Remix IDE with this code](https://remix.ethereum.org/topos-protocol/example-code-depot/blob/main/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory-3.sol)

The require statement in a Solidity contract is used to check for conditions and to revert the transaction if the condition is not met, effectively ensuring that certain criteria are true before executing further code. In this case, if the string is not less than 256 bytes in length, the contract will not continue to execute.

With that safety check in place, let's add a line to the contract that will get the stored data be retrieved.

<GitHubBlock language="solidity" org="topos-protocol" repo="example-code-depot" path="/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory.sol" lines="1..15" highlights="12..14" />

[Launch a Remix IDE with this code](https://remix.ethereum.org/topos-protocol/example-code-depot/blob/main/examples/docs.topos.technology/tutorials/deploy-a-contract-on-topos/memory.sol)

This contract is now complete. If you redeploy it into the Remix internal VM using the steps outlined earlier, you should be able to store arbitrary short strings, and then retrieve them.

## Deploying To Topos (or Incal)

Now that you are satisfied that you have a working contract, you are ready to deploy it to a live network.

To deploy a contract to a live network, you will need to have some tokens on that network to pay for the gas fees. For both the Topos and the Incal subnets, a [Faucet](https://faucet.testnet-1.topos.technology/) is available to provide tokens. If you have not used the faucet before, consider taking a few minutes to follow the guide called [Use the Faucet to Get Testnet Tokens](/content/how-to/use-the-testnet.html).

Once you have done that, you will also have successfully connected your MetaMask wallet to both the Topos and the Incal subnets, and are ready to deploy your contract to a live network.

In the _ENVIRONMENT_ dropdown, there is an option for `Injected Provider - MetaMask`. Select that.

<ZoomImage small>
![Remix IDE Injected Provider](/images/remix-injected-provider.png)
</ZoomImage>

This tells Remix to deploy to whichever network your MetaMask wallet is currently connected to.

If you press the `Deploy` button now, however, you may be disappointed by the outcome. By default, Remix IDE compiles your contract with the most recent version of the Solidity contract, which as of the current date (6 Feb 2024) is called `cancun`. However, the EVM implementation that is currently running on the Topos and Incal subnets is a little behind in its support for the most recent Solidity compiler versions, and does not support some of the opcodes used in those versions. So, before you deploy your contract, you will need to recompile it with a version that the Topos and Incal subnets support.

Click on the icon for the `Solidity Compiler`. In the _SOLIDITY COMPILER_ panel that comes up, there is an _Advanced Configurations_ section. Click on it to open it.

<ZoomImage small>
![Remix IDE Advanced Configurations](/images/remix-advanced-configuration-paris.png)
</ZoomImage>

In this panel, click on the dropdown for _EVM VERSION_. Select `paris`.

The IDE will automatically recompile your contract. You can now switch back to the _Deploy & Run Transactions_ panel and press the `Deploy` button.

When you do this, your MetaMask extension will open a dialog, asking for you to confirm the transaction, since it costs (a small amount of) gas to deploy a contract.

<ZoomImage small>
![MetaMask Confirm Deployment](/images/remix-metamask-deploy-confirmation.png)
</ZoomImage>

After confirming the transaction, your Remix IDE should show a transaction record that looks something like this:

<ZoomImage small>
![Remix IDE Transaction Record](/images/remix-deployed-contract-transaction.png)
</ZoomImage>

Congratulations! You have successfully deployed a contract to Topos (or Incal). You can now interact with your deployed contract, sending data to store, and then retrieving it. One difference that you will note from when you were testing using the _Remix VM_ is that every time that you send a string to store, you will be asked by MetaMask to confirm the transaction. Like deploying a contract, a transaction that stores data onchain requires gas to pay for the function call and the data storage. It is, however, free to call the `recall` function to retrieve the stored data.

## Summary and Wrapping Up

In this guide, we have walked through the process of deploying a simple contract to the Topos testnet. We used the Remix IDE to write, compile, and deploy the contract. We tested the contract using the in-browser EVM provided by the IDE, and we deployed the contract to a live testnet subnet.

The important things to remember when deploying contracts to the Topos or the Incal subnets is that at the current time, the contract should be compiled using the `paris` version of the Solidity compiler.