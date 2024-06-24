# Rift Insight

Rift Insight is a Next.js application providing detailed League of Legends player stats and insights.

![release badge](https://img.shields.io/github/v/release/oskvr37/rift-insight?style=for-the-badge)
![state badge](https://img.shields.io/badge/current_state-in_development-red?style=for-the-badge)

# Tech stack

![next.js badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![tailwindcss badge](https://img.shields.io/badge/tailwindcss-089bdc?style=for-the-badge&logo=tailwind-css&logoColor=white)
![typescript badge](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![postgreSQL badge](https://img.shields.io/badge/postgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![jest badge](https://img.shields.io/badge/jest-9b0f1d?style=for-the-badge&logo=jest&logoColor=white)

# Installation

Install the dependencies with npm:

```bash
npm install
```

## Environment variables

You need to set the following environment variables:

```bash
RIOT_API_KEY="your_riot_api_key"
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

### Database

Rift Insight uses a PostgreSQL database. You can run `npx prisma studio` to open the Prisma Studio and interact with the database. Use `npx prisma migrate dev` to sync the database schema with the Prisma schema.

### Riot API

You need to get an API key from the [Riot Developer Portal](https://developer.riotgames.com/). The API key is used to fetch data from the Riot API.

## Usage

Run the development server with `npm run dev` or build the application with `npm run build` and start the server with `npm run start`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Testing

Run the tests with Jest:

```bash
npm run test
```

# Features

Check the [features](docs/FEATURES.md) document for more information.
