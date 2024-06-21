# Planned features

## Searching

We will store users in a database
and allow searching for users by nickname.

### Search Bar

- choose region to search in
- search by nickname + tag
- search history (local storage)
- add favorite users (local storage)

## User Profile

- Avatar with nickname
- Current rank
- Win rate and other stats
- Match history
- Recently played with
- Champion mastery

## Database

### Tier graph

We will store user points history in a database.
This will allow us to display a graph of user ranked points over time.

### Cache

Since next.js is not supporting caching prisma queries,
we will have to implement our own caching mechanism.
Redis would be a good choice for this.
