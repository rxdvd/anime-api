# anime-api

Paired API exercise working on APIs.

## Usage

1. Clone this repo using `git clone`
2. Enter the directory `cd anime-api`
3. Install dependencies `npm install`

* `npm start` to run the server.
* `npm test` to run tests contained in `test/` directory
* `npm run dev` to run the server with `nodemon`.

## Server

The server runs on port 3000 with the API on the `/animes` route and a small webpage demonstration at `localhost:3000/demo`.

## Project Goal

Build a RESTful API of choice using node and express with CRUD (Create, Read, Update, Delete) functionality.

## Design

We decided to make an API to get and manipulate data about anime series with the following routes:

| Route | Action |
| - | - |
| `GET /animes` | Return a JSON object of all anime data |
| `GET /animes/:id` | Return a JSON object with data for a specific anime |
| `POST /animes` | Create a new anime data entry |
| `PATCH /animes/:id` | Update data for a specific anime |
| `DELETE /animes/:id` | Delete data for a specific anime |
| `DELETE /animes` | Delete all anime data |
| `GET /animes/random` | Return a JSON object with data for a random anime |

## Improvements & Ideas

* Add more error handling for the different routes such as the `PATCH` and `DELETE` paths.
* Make the data persist between subsequent server start-ups using `fs`.
* Run the demonstration webpage on a different port.
* Make a model for anime using a JavaScript class.
* Make a route to generate an anime recommendation based on specified genres.
  
## Pitfalls & Discoveries

* We ran into a bug on the `DELETE /animes/:id` path where an attempt to use `Array.slice()` with an argument involving `req.params.id` was resulting in an empty array. It was discovered that `req.params.id` always returns string values and they must be converted into a `number` before performing math operations.
* Due to the same reason described above we got a bug when trying to compare the id from `req.params` with the id in our data to find the correct data entry using `===`. We ended up fixing the bug by using `==` instead but maybe a more reliable approach would have been to explicitly convert the id into a number.

## Remaining Bugs

* Trying to create a new entry after deleting one causes an id collision. This can be fixed by intialising new entries with an id that is one more than the highest id in the dataset rather than simply adding 1 to the size of the array. This might also be a good thing to bear in mind when writing tests.
