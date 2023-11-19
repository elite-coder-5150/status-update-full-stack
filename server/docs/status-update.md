# getStatusUpdate Function

## Description

This asynchronous function is responsible for retrieving a status update based on the provided identifier (`id`). It queries the database and returns the result if found, or sends appropriate error responses if the update is not found or an internal server error occurs.

## Parameters

- `req` (Object): Express request object.
- `res` (Object): Express response object.

## Usage

```javascript
// Example Usage:
const express = require('express');
const app = express();

app.get('/status/:id', getStatusUpdate);


#### getAllUpdates
This function  is designed to retrieve status updates along with the 
corresponding user names based on a provided user ID. Here's what the function 
returns based on different scenarios:

Successful Response:

If the database query (query_db(sql, [id])) returns results, meaning there are matching status updates, the function sends a successful response with the first result found in the results array.
The response format would be an object containing the status update information along with the user name.
No Results (HTTP 404):

If the query returns an empty array (no matching status updates), the function sends a 404 Not Found response.
The response format is an object indicating that no results were found, with a relevant message.
Internal Server Error (HTTP 500):

If an error occurs during the execution of the function (for example, an error in the SQL query or a database connection issue), the catch block handles the error. It logs the error to the console and sends a 500 Internal Server Error response to the client.
The response format is an object indicating that there was an internal server error, with a relevant error message.