# Rift Insight

![next.js badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![tailwindcss badge](https://img.shields.io/badge/tailwindcss-089bdc?style=for-the-badge&logo=tailwind-css&logoColor=white)
![typescript badge](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![postgreSQL badge](https://img.shields.io/badge/postgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![jest badge](https://img.shields.io/badge/jest-9b0f1d?style=for-the-badge&logo=jest&logoColor=white)

Rift Insight is a Next.js application providing detailed League of Legends player stats and insights.

![state badge](https://img.shields.io/badge/current_state-in_development-red)

# Installation

Install the dependencies with npm:

```bash
npm install
```

Available scripts:

```bash
npm run dev
npm run build
npm run start
```

## Database

Rift Insight uses a PostgreSQL database. You need to set an environment variable `DATABASE_URL` with the connection string to your database.

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/database
```
<!-- TODO: schema sync instructions -->

# Usage

To use Rift Insight, you must have a Riot Games API key.
You can get one by following the instructions [here](https://developer.riotgames.com/).
You will also need to create a `.env.local` file in the root directory of the project and add the following line:

```bash
RIOT_API_KEY=YOUR_API_KEY
```
