---
title: Topos Playground
description: Install and test cross-subnet ERC-20 locally
---

# Topos Playground

The [Topos Playground](https://github.com/topos-protocol/topos-playground) installs and launches all the elements that compose a local test network. The first part of this section is optional and will let you test locally what you already experienced on the `Testnet`.

## Component overview

Before you dive in, take a moment to understand the Playground at a high level. It makes use of the following components:

* A [local network](https://github.com/topos-protocol/local-erc20-messaging-infra/tree/v0.1.6), which utilizes [Docker and Docker Compose](https://docs.docker.com/desktop/), to test the essential (and some of the optional) components of the Topos Stack. The repository will [spin up a local Docker network](https://docs.docker.com/network/) called `local-erc20-messaging-infra-docker`. This Docker network will consist of two subnets:
  * The [Topos Subnet](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/v0.1.6/subnet-topos.yml), which will simulate the actual **Topos Subnet**.
  * The [Incal Subnet](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/v0.1.6/subnet-incal.yml), a standard subnet, which will demonstrate the execution of cross-subnet messages.
* A [TCE network](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/v0.1.6/tce.yml), which will consist of five TCE nodes in order to achieve a [reliable broadcast](../module-1/4-protocol.html#transmission-control-engine-tce-) of the certificates.
* A [dApp](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/tree/v0.1.4), to interact with the deployed network and trigger cross-subnet messages.
* An [executor service](https://github.com/topos-protocol/executor-service/tree/v0.2.0), which is an example implementation to execute cross-subnet calls on the receiving subnet.

<HighlightBox type="info" title="Remember">

You learned about the different components in the [first chapter](../module-1/4-protocol.html#-object-object-smart-contract). If you need a refresher, review that chapter before you continue.

</HighlightBox>

## Prerequisites

For the Playground to work, you should install:

* [Docker](https://docs.docker.com/get-docker/), which contains the following necessary components:
  * Docker, to run the container.
  * Docker Compose, to manage containers and networking.
* [Node.js](https://nodejs.dev/), which will be used by the dApp.
* [MetaMask](https://metamask.io/download/), which will also be used by the dApp.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which is used to fetch different components that live in their respective repositories.

<HighlightBox type="info" title="Note">

Minimum required versions:
* Node.js -- **version 16.0.0 or higher**
* Docker -- **version 17.06.0 or higher**

</HighlightBox>

## Install the Topos Playground

<Steps>
<StepItem>

Once you have the necessary software on your machine, run:

```sh
$ npm install @topos-protocol/topos-playground@0.1.0 --save-dev --save-exact
```

</StepItem>
<StepItem>

After the installation is complete, check your installation:

```sh
$ npx topos-playground --help
```

Now you can start the Playground:

```sh
$ npx topos-playground start
```

</StepItem>
<StepItem>

It will first check [your machine](./1-topos-playground.html#prerequisites):

```txt
Starting Topos-Playground...

Verifying dependency installation...
✅ Docker -- Version: 24.0.5
✅ Git -- Version: 2.37.0
✅ Node.js -- Version: 19.6.0
✅ Dependency checks completed!
```

</StepItem>
<StepItem>

It will then clone the _local network_, _dApp_ and _executor service_ repositories and set up the environment parameters:

```txt
✅ Working directory exists

Cloning repositories...
✅ local-erc20-messaging-infra | v0.1.6 successfully cloned
✅ dapp-frontend-erc20-messaging | v0.1.4 successfully cloned
✅ executor-service | v0.2.0 successfully cloned

Copying .env files across repositories...
✅ .env.dapp-frontend copied
✅ .env.dapp-backend copied
✅ .env.executor-service copied
✅ .env.secrets copied
```

</StepItem>
<StepItem>

Eventually, it will start many components:

```txt
Running the ERC20 messaging infra...
✅ Subnets & TCE are running

Retrieving contract addresses...
✅ Contract addresses were retrieved and written to env files

Running the redis server...
✅ redis is running

Running the Executor Service...
✅ Deps are installed
✅ Web server is running

Running the dApp Frontend...
✅ Deps are installed
✅ Static files are built
✅ Web server is running
```

</StepItem>
<StepItem>

If everything works correctly, you should see:

```txt
🔥 Everything is done! 🔥

🚀 Start sending ERC20 tokens across subnet by accessing the dApp Frontend at http://localhost:3001

ℹ️  Ctrl/cmd-c will shut down the dApp Frontend and the Executor Service BUT will keep subnets and the TCE running (use the clean command to shut them down)
ℹ️  Logs were written to ~/.local/state/topos-playground/logs/log-5c63e885-129b-4941-b304-bdae3b780ac5.log
```

</StepItem>
</Steps>

With everything running, you can start interacting with the frontend. You should be familiar with the frontend from the [previous section](./1-ERC20-Messaging.html). In addition, you can use the **Topos Explorer** to observe your local network. Just use [your local endpoints instead of the `Testnet`](./2-explorer.html).

## Components in-depth

After playing with and testing the **Topos Playground**, you should now be motivated to dive into the details. The four key elements are:

* **The TCE network**
* **The Topos Subnet**
* **The Incal subnet**
* **The ERC20 Messaging Frontend**

This section will look at each of them.

## The TCE network

The Playground first [bootstraps a TCE node](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/c44ee1d46018eaab1e78e092393b3c75aa2ab82d/tce.yml#L11), and then runs  [four additional TCE nodes](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/c44ee1d46018eaab1e78e092393b3c75aa2ab82d/tce.yml#L59) alongside it. All five TCE nodes will broadcast certificates – the first one generates keys for testing purposes. These TCE nodes are spawned with the help of the **Topos CLI**, which you will learn about and experiment with in the next section.

{/* update after TCE is using ICE-FROST */}

## The Topos Subnet

[You have already learned](../module-1/4-protocol.html#subnets) that the **Topos Subnet** is a special element of the zkEcosystem. The [underlying Docker Compose file](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/main/subnet-topos.yml) for it includes:

* One container which generates the keys and subnet genesis block, and also sets the consensus to [Istanbul Byzantine Fault Tolerant (IBFT)](https://docs.kaleido.io/kaleido-platform/protocol/polygon) during initialization. This is done with the help of [Polygon Edge](https://www.kaleido.io/polygon-edge).
* Four Polygon Edge node containers, of which the first exposes the JSON-RPC API.
* A sequencer container, which communicates with the TCE network. The sequencer container utilizes the [Topos CLI](https://github.com/topos-protocol/topos) in order to [start a sequencer node](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/45450c2376a3aa28a2eed7119b59c29f7625b545/subnet-topos.yml#L147).

## The Incal Subnet

Because the **Topos Playground** is just a basic tool for demonstration and local testing, the network topology of the subnets it creates is similar. [Incal](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/main/subnet-incal.yml) consists of four node containers and one sequencer container. In addition, one container creates the keys and the genesis block. When the TCE network is up, the sequencer subscribes to it to receive relevant certificates and to broadcast own certificates to it.

After the subnet is ready, the [Playground starts a container](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/main/contracts.yml) for the contracts:

* One container to prepare necessary artifacts in order to deploy the contracts.
* One container for the Incal subnet to deploy its [intended contracts](https://github.com/topos-protocol/topos-smart-contracts/tree/main/scripts).

This container also includes some [scripts](https://github.com/topos-protocol/topos-smart-contracts/tree/main/scripts) – for example, for contract deployments and subnet registrations. So, by default, [the Incal subnet is registered](https://github.com/topos-protocol/local-erc20-messaging-infra/blob/45450c2376a3aa28a2eed7119b59c29f7625b545/contracts.yml#L34) on the Topos Subnet. The contract container runs once and exit after the deployment.

## The ERC20 Messaging frontend

The ERC20 Messaging frontend for the Playground consists of a [basic web server](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/tree/v0.1.4/packages/backend) and the [frontend](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/tree/v0.1.4/packages/frontend) you interacted with previously. The frontend utilizes the [ethers.js library](https://docs.ethers.org/v5/) to call the respective contracts. The first action you tried, the registration of a token, invokes the [`deployToken`](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/blob/v0.1.4/packages/frontend/src/hooks/useRegisterToken.ts#L41) function on the [ERC20Messaging contract](https://github.com/topos-protocol/topos-smart-contracts/blob/main/contracts/examples/ERC20Messaging.sol). Similarly, you can see that a token is sent by calling the [`sendToken`](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/blob/v0.1.4/packages/frontend/src/hooks/useSendToken.ts#L34) function of [the contract](https://github.com/topos-protocol/topos-smart-contracts/blob/da41ebbeaeb3ed91b5aa1c6e750f754a7316f721/contracts/examples/ERC20Messaging.sol#L97).

To be more precise, a cross-subnet token transfer is divided into the [three steps](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/tree/v0.1.4/packages/frontend/src/components/steps) that were displayed by the ERC20 Messaging frontend during your test. You can examine the code to better understand the process behind the steps.

One thing to mention specifically in relation to the Playground is the [use of the executor service](https://github.com/topos-protocol/dapp-frontend-erc20-messaging/tree/v0.1.4/packages/frontend/src/components/steps/Step2.tsx#L169). What the service essentially does is:

1. [Wait](https://github.com/topos-protocol/executor-service/blob/v0.2.0/src/execute/execute.processor.ts#L84) for the expected certificate to be delivered.
2. [Submit](https://github.com/topos-protocol/executor-service/blob/v0.2.0/src/execute/execute.processor.ts#L99) the transaction payload and Merkle proof of inclusion.

# Up next

You have now looked at the details of the playground components, one of them being the Topos CLI. In the next section, you will look at the CLI in more depth.
