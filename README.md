# Discussion Service

## Overview
Manages discussion posts, including creating, updating, deleting, and retrieving discussions.

## Prerequisites
- Node.js
- MongoDB

## Setup

1. Install dependencies:
   ```sh
   npm install
2. Configure environment variables in `.env` file:
   ```sh
   PORT=5001
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret_key
3. Start the service:
   ```sh
   npm start
## API Endpoints
- POST /discussions - Create a new discussion
- GET /discussions/:id - Get a discussion
- PUT /discussions/:id - Update a discussion
- DELETE /discussions/:id - Delete a discussion
- POST /discussions/:id/like - Like a discussion
- GET /discussions/search/hashtag - Search discussions by hashtag
