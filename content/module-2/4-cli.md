---
title: Topos CLI
description: Test the Topos command-line tool
---

# Topos CLI

You have seen different components of the Topos Stack working together in the Playground. Besides delegating and managing different components via Compose files, you can use the Topos CLI to collectively start and run different components.

The Topos CLI has already been mentioned many times in this chapter. Now it is time for you to install and test it.

## Install from the source

You will fetch and build the [Topos CLI](https://github.com/topos-protocol/topos) from the source. This may take some time; alternatively, you can [download and run a released version directly](https://github.com/topos-protocol/topos/releases/). This section assumes that you work with [version 0.0.5](https://github.com/topos-protocol/topos/releases/tag/v0.0.5).

<HighlightBox type="info" title="Make sure to install Rust Toolchain">

The [Topos CLI](https://github.com/topos-protocol/topos) is written in Rust, so you will need to have a [Rust Toolchain installed and ready](https://rustup.rs). Alternatively, you can use a [Rust Docker image](https://hub.docker.com/layers/library/rust/1.72.0-bullseye/images/sha256-e431500c0bd21997da93fbb6cc3a20833f1307306e18982eeb503b6f432ee9f5) to achieve the same.

</HighlightBox>

When you are ready, use `cargo` to fetch and compile the CLI:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ cargo install topos --git https://github.com/topos-protocol/topos --tag v0.0.5
```

</TabGroupItem>
<TabGroupItem title="Docker">

In a new `topos-cli.dockerfile`, put:

```Dockerfile [topos-cli.dockerfile]
FROM rust:1.72.0-bullseye

RUN apt-get update
RUN apt-get install --yes protobuf-compiler llvm-dev libclang-dev clang
RUN cargo install topos --git https://github.com/topos-protocol/topos --tag v0.0.5

ENTRYPOINT [ "topos" ]
```

Then create the image:

```sh
$ docker build . -f topos-cli.dockerfile -t topos-cli:v0.0.5
```

</TabGroupItem>
</TabGroup>

{/* TODO replace main with a tag */}

You can check your installation with:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos --help
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm topos-cli:v0.0.5 --help
```

</TabGroupItem>
</TabGroup>

This will show you all the available commands:

```txt
Topos CLI

Usage: topos [OPTIONS] <COMMAND>

Commands:
  tce        Topos CLI subcommand for the TCE-related functionalities
  sequencer  Topos CLI subcommand for the Sequencer components
  network    Topos CLI subcommand for network-related functionalities (e.g., running the certificate spammer)
  setup      Topos CLI subcommand for the setup of various Topos-related components (e.g., installation of Polygon Edge binary)
  subnet     Topos CLI subcommand for the Polygon Edge-related functionalities
  node       Utility to manage your nodes in the Topos network
  doctor
  help       Print this message or the help of the given subcommand(s)

Options:
  -v, --verbose...   Defines the verbosity level
      --home <HOME>  Home directory for the configuration [env: TOPOS_HOME=] [default: /home/user/.config/topos]
  -h, --help         Print help
```

In order to test the functionality presented here, the Topos CLI will need to download and install the `polygon-edge` binary. Move to a new directory that will be your workspace for this exercise, then:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos setup subnet
$ export TOPOS_POLYGON_EDGE_BIN_PATH=$(pwd)
$ export TOPOS_HOME=~/.config/topos/
```

</TabGroupItem>
<TabGroupItem title="Docker">

Add to your `topos-cli.dockerfile`:

```diff-Dockerfile
    RUN cargo install topos --git https://github.com/topos-protocol/topos --branch main

+   ENV TOPOS_HOME=/root/.config/topos/
+   ENV TOPOS_POLYGON_EDGE_BIN_PATH=/usr/local/bin
+   RUN mkdir /usr/local/share/polygon-edge
+   RUN topos setup subnet --path /usr/local/share/polygon-edge
+   RUN ln -s /usr/local/share/polygon-edge/polygon-edge $TOPOS_POLYGON_EDGE_BIN_PATH/polygon-edge

    ENTRYPOINT [ "topos" ]
```

After that, you need to rebuild the image. This should be fast, as it only runs these additional steps:

```sh
$ docker build . -f topos-cli.dockerfile -t topos-cli:v0.0.5
```

</TabGroupItem>
</TabGroup>

By default, the Topos CLI downloads the most recent binary into the current directory. Note that you can find out the command's options with:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos setup subnet --help
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm \
    topos-cli:v0.0.5 setup subnet --help
```

</TabGroupItem>
</TabGroup>

<HighlightBox type="info" title="Note">

You can use the `--help` flag for all the subcommands if you need further information. The CLI has built-in default parameters that will be used if no flag or environment parameter is provided. For example, you can use the `--path <PATH>` flag to set the directory for the Polygon Edge binary, or you can set the environment parameter `TOPOS_SETUP_POLYGON_EDGE_DIR`.

</HighlightBox>

It makes sense to install the `polygon-edge` binary into a folder that is included in your `$PATH` because the CLI will need to run it. However, you still need to set the `TOPOS_POLYGON_EDGE_BIN_PATH` parameter in your shell (via `export`, or by adding it into your `.bashrc` or `.zshrc`) for the CLI to know where to find it.

## Initialize your node

The Topos CLI offers subcommands in order to manage your nodes. If you want to start an Edge validator node, first you will need to generate an [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) and a [BLS](https://en.wikipedia.org/wiki/BLS_digital_signature) key for the validator. In addition, `libp2p` will need a [key in order to be identified](https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md).

Create your first node, and name it `val-alice`:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos node init --name val-alice
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm \
    -v $(pwd)/.config:/root/.config \
    topos-cli:v0.0.5 node init --name val-alice
```

</TabGroupItem>
</TabGroup>

This will create some local folders for a validator node with the alias `val_alice` and the three following keys:

```txt
.config/topos/node/val-alice
├── config.toml
├── consensus
│   ├── validator-bls.key
│   └── validator.key
└── libp2p
    └── libp2p.key
```

The command also warned you that these keys, which should be secret, are in fact stored unencrypted on disk:

```txt
[WARNING: INSECURE LOCAL SECRETS - SHOULD NOT BE RUN IN PRODUCTION]
```

Another file that has been created is `config.toml`. You will use its content in the next step when you start a node, and it is worth looking at in more detail.

### Config

The `config.toml` is the main configuration file. Have a look at the fields:

```toml
[base]
name = "val-alice"
role = "validator"
subnet-id = "topos"

[edge]
# Any flags to forward to Polygon Edge

[tce]
db-path = "~/.config/topos/node/val-alice/tce_rocksdb"
graphql-api-addr = "0.0.0.0:4030"
grpc-api-addr = "0.0.0.0:1340"
metrics-api-addr = "0.0.0.0:3000"
```

In the `config.toml`, some of the scopes are necessary (`base` and `edge`) while others are optional (`tce`):

* **`base`:** Includes the general parameters for the node:
  * `name`: This string is the name of the node.
  * `role`: The role can be **`"validator"`** or **`"sequencer"`**. It is set as `"validator"` as this is the default when running the `init` command.
  * `subnet-id`: This is the alias used for the subnet in which the node participates. Note that it will determine the location of the `genesis.json` file. In the example above, `"topos"` is used for the Topos Subnet.
* **`edge`:** Includes parameters passed on to Polygon Edge. You can fetch parameters for this scope via `polygon-edge server --help`. Note that you have to pass the values as `edge-flag = "value"`, regardless of whether it is a number or a string.
* **`tce`:** This is optional in the sense that only validators participating on the Topos Subnet or a sequencer will need to provide it. It includes the parameters for the TCE component:
  * `db-path`: Specifies the directory for the TCE DB.
  * `graphql-api-addr`: Determines the GraphQL API.
  * `grpc-api-addr`: Sets the TCE gRPC API.
  * `metrics-api-addr`: The socket for the Prometheus API.

### Initialize a sequencer

Generate a config for a sequencer node with the alias `seq-bob`:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos node init --name seq-bob --role sequencer
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm \
    -v $(pwd)/.config:/root/.config \
    topos-cli:v0.0.5 node init --name seq-bob --role sequencer
```

</TabGroupItem>
</TabGroup>

In the newly created `config.toml`, you will find another scope called `sequencer`:

* **`sequencer`**: Includes the parameters for the sequencer:
  * `subnet-contract-address`: **ToposCore** contract address deployed on the subnet.
  * `subnet-jsonrpc-endpoint`: The JSON-RPC endpoint exposed by the Edge Node.
  * `tce-grpc-endpoint`: The TCE gRPC endpoint.

### Topos Subnet genesis file

In order to start a node locally for the Topos Subnet, you will need to fetch the genesis file:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ wget -P $TOPOS_HOME/subnet/topos/ https://gist.githubusercontent.com/gruberb/19dbc24e9b2405e7562f63d4032450e6/raw/12499fdc40980209c7acd2146ee84c779dbe9e4d/genesis.json
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm \
    -v $(pwd)/.config:/root/.config \
    --entrypoint wget \
    topos-cli:v0.0.5 -P $TOPOS_HOME/subnet/topos/ https://gist.githubusercontent.com/gruberb/19dbc24e9b2405e7562f63d4032450e6/raw/12499fdc40980209c7acd2146ee84c779dbe9e4d/genesis.json
```

</TabGroupItem>
</TabGroup>

Now you are ready to start a Topos Subnet node.

## Launch your node

If you are running with Docker, first you need to create the network on which your two nodes will run:

<TabGroup>
<TabGroupItem title="Docker">

```sh
$ docker network create net-topos-subnet
```

</TabGroupItem>
</TabGroup>

When launching a node with the `node` subcommand, you can **specify which node configuration** you want to use via the `--name` flag:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos node up --name val-alice
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm -it \
    -v $(pwd)/.config:/root/.config \
    --network net-topos-subnet \
    topos-cli:v0.0.5 node up --name val-alice
```

Do not forget to launch it inside the `net-topos-subnet` network. Be sure to use `-it` so that you can interrupt it with <kbd>CTRL-C</kbd>.

</TabGroupItem>
</TabGroup>

This will fetch the config generated for the validator node and start a node with it. If the node runs, you can start a sequencer with the auto-generated config for `seq-bob`:

<TabGroup>
<TabGroupItem title="Local" active>

```sh
$ topos node up --name seq-bob
```

</TabGroupItem>
<TabGroupItem title="Docker">

```sh
$ docker run --rm -it \
    -v $(pwd)/.config:/root/.config \
    --network net-topos-subnet \
    topos-cli:v0.0.53 node up --name seq-bob
```

As before, do not forget to launch it inside the `net-topos-subnet` network so that it can contact `val-alice`.

</TabGroupItem>
</TabGroup>
