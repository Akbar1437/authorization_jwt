# authorization_jwt

This is a repository for creating a JWT authentication flow using TypeScript, Express.js and TypeORM.

## installation

Before start you need to clone the repository and run on your local machine.

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
