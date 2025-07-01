# Recipe Wrangler

## Description

Recipe Wrangler is a web app that lets user search for and create recipes. It uses the
[Spoonacular API](https://spoonacular.com/food-api/docs#Search-Recipes-Complex) as a source of data for recipes. Authenticated users can favorite recipes they like from their search results, and also create their own recipes (as well as update and delete their custom recipes). The backend implements a REST API which serves and consumes JSON data.

## Tech Stack

### Frontend

- Next.js (application logic)
- Tailwind CSS and daisyUI (styling)
- Firebase (authentication)

### Backend (this repo)

- Express.js
- PostgreSQL and Knex.js
- Firebase (authentication)

Link to the frontend repo [here](https://github.com/Justin-K-Ellis/recipe_wrangler_client "Recipe Wrangler Client").

## Installation

### Env variables

Begin by creating a `.env` file in the root of the project. The file should have the following
fields:

```
PORT

DB_URL

DB_USER
DB_NAME
DB_PASSWORD

CLIENT_URL
AG_BRANCH_URL

GOOGLE_APPLICATION_CREDENTIALS
SPOONTACULAR_API
```

Assign `PORT` to the port of your liking.

Provision a database and either assign the `DB_URL` field to the connection string or
assign the values of `DB_USER`, `DB_NAME`, and `DB_PASSWORD` as appropriate.

`CLIENT_URL` (and/or `AG_BRANCH_URL`) should be assigned the URL of the frontend app.
(CORS is configured to accept these URLs as well as `localhost:3000` by default).

This project uses Firebase for authentication and requires a Firebase account. Set up a
Firebase project if you haven't yet, and acquire your service account credentials. You
can learn more about Firebase service accounts [here](https://firebase.google.com/support/guides/service-accounts).

Download the serviceAccount.json file and place it in the root of the project and point `GOOGLE_APPLICATION_CREDENTIALS` to that file. In `src/auth/firebase.js`, when developing locally, use:

`const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;`

When deployed, use:

`const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);`

You'll also need a Spoontacular API key. You can get a free (with limits) key [here](https://spoonacular.com/food-api).

Once the above is taken care of, install and build with:

```bash
npm install
npm run build
npm run migrate
```

You can then run the project with:

```bash
npm start
```

## Usage

### Auth

This project has several API endpoints that the client consumes. All routes are protected
by the `authenticateToken` middleware found in the `/auth` directory. This middleware uses
Firebase auth and checks the authorization header on an incoming request and attaches a
`user` field (containing the decoded auth token) to authorized `req` objects.

### `/user`

This route has only one endpoint, and uses a `POST` request to create a user. The endpoint
expects an authenticated `req` object with a `user` field, and uses this data to create a
new user in the database.

### `/custom-recipe`

#### Create

- `POST /`
  This endpoint is used to create a new custom recipe associated with an authenticated user.

It expects a JSON object in the request body with the following shape:

```
{
    name,
    cuisine,
    ingredients,
    steps,
    notes,
    readyInMinutes,
    servings,
},
```

#### Read

- `GET /`
  This endpoint serves an array of custom recipe objects (this is, all custom recipes for a given user).
- `GET /:uuid`
  Each custom recipe is identified by a uuid in the database. Clients can get data
  on individual recipes by hitting this endpoint.

#### Update

- `PUT /:recipeId`
  Clients can update a specific recipe by hitting this endpoint and pass the `recipeId` (that is, the uuid) as a route parameter.

#### Delete

- `DELETE /:recipeId`
  Specific recipes can likewise be deleted with delete requests sent to this endpoint when passing `requestId` (uuid) in the router parameter.

### `/external-recipe`

#### Search by keyword

- `GET /search/:searchTerm`
  The client can search for recipes from the Spoontacular API on this endpoint. Returns an array of recipe objects.

#### Get recipe info by id

- `GET /id/:id`
  Client can request information on a specific recipe from the Spoontacular API via this endpoint. Returns a single recipe object.

#### Favorite a recipe

- `POST /favorite/:recipeId`
  Clients can add a recipe from the Spoontacular API to their list of favorited recipes when passing a `recipeId` query parameter. If the recipeId does not exist in the database, it is added, and the `liked` status for the user is set to `true`. Otherwise (is the `recipeId` already exists in the DB), the `liked` field is set to `true` for the user.

#### Unfavorite a recipe

- `PUT /unfavorite/:recipeId`
  Clients can remove a Spoontacular recipe from their favorites list. That is, the `liked` field in the DB for the user is set to `false`.

#### Get all favorite recipes for a user

- `GET /favorites`
  Client can get a list of all favorited recipes (Spoontacular recipes where the `liked` field in the DB is set to `true`). Returns an array of recipe objects.

## For the Reviewer

There have been substantial changes to the `/custom-recipe` route (the addition of the
update and delete functionality) and to the `external-recipe` route (the addition of the
favorite, unfavorite, and get all favorites enpoints), as well as the corresponding methods
in the `customRecipe.model.js` and `externalRecipe.model.js` files.

On Git, updates start from commit `1d9bdf7`.
