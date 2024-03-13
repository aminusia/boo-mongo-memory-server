# MongoDB Memory Server for Boo

## Installation

- Clone this repository
- run `npm install`
- run `npm start`

## Testing

- run `npm run test`

## Routes

- `GET /` Preserved for landing, currently serving first document from dummy profile
- `GET /profiles/:id` Show any saved profile
- `POST /profiles` Create new profile
- `POST /profiles/:id` Update profile
- `GET /users/:id` Get any user
- `POST /users/` Create new user
- `POST /users/:id` Update user
- `GET /comments/` List comments
- `GET /comments/:id` Get any comment
- `POST /comments/` Write new comment
- `POST /comments/:id` Update comment
- `POST /comments/:id/like` Toggle like/dislike for a comment
