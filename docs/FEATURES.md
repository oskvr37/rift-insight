# Planned features

## Searching

We will store users in a database and allow searching for users by nickname.

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

### Cache

Since next.js is not supporting caching prisma queries, we will have to implement our own caching mechanism. Redis would be a good choice for this.
