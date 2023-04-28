# JWT Auth FullStack

## installation

Before you start you need to clone the itn repository and run itn core services on your local machine.
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

Next, you need to build the source code:

```shell
cd server
npm run compile
```

after run:

```shell
npm run watch
```

```shell
cd ./packages/web
npm start
```

In the web directory, you can run:

### `yarn dev`
