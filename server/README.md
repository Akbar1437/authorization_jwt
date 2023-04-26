# NewOne

# installation

Before you start you need to clone the itn repository

## installation

```shell
git clone https://github.com/Akbar1437/newone.git
```

Run in the root directory of the cloned repository:

```shell
npm i
```

## Run docker compose

```shell
docker-compose up
```

In PostgresDB you need to create a databases called `newone`.

Copy `env.dist` content and paste it to `env` file.

Build the source code:

```shell
npm run compile
```
