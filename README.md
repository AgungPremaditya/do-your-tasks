# Welcome to Do-Your-Tasks App!

This App is Build Using

- [Adonis.JS](https://adonisjs.com/)
- [Redis](https://redis.io/)

## Setup

1. Install all packages :

```bash
npm install
```

2. Copy `.env.example` to `.env` :

```bash
cp .env.example .env
```

3. You can change the `.env` config. Especially the database config to adjust with your local machine. You can also use Docker Compose with existing config

4. Create app secret key :

```bash
node ace generate:key
```

5. Copy the result from above command to `.env`, for example :

```.env
APP_KEY=C02dzFVUOvlpsJrJByfM96Fi1vNWim0A
```

6. Migrate the database :

```bash
node ace migration:run
```

## Seeding Databases

To run database seeding you can use command below

```bash
node ace db:seed
```

## Testing Unit

To run testing you can use command below

```bash
node ace test unit
```

## Dummy Data

To using this API you can use dummy user below

```
email : schias@gmail.com
password : secret123
```
