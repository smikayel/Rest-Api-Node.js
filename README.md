## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## How to run? 
before starting be sure to run dockerize database
### `docker compose up`
Run migrations with the command
### `npm run migrate`
Run the server in development mode.
### `npm run dev`

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

### Migrations

Generate migration based on entities

``` cmd
npm run migration:generate src/repos/migrations/<migration_name>

```

Create entity

``` cmd
 npm run entity:create src/repos/entities/
```

migrate database

``` cmd
npm run migrate

```

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 

## Deployment (Additional information)

if you will get issues with deployment check "pre-start.ts" file for .env
