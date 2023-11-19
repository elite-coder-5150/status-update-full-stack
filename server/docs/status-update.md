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
```

#### getAllUpdates

This function  is designed to retrieve status updates along with the 
corresponding user names based on a provided user ID. Here's what the 
function returns based on different scenarios:

#### Successful Response:

If the database query (query_db(sql, [id])) returns results, meaning there are 
matching status updates, the function sends a successful response with the first 
result found in the results array.

The response format would be an object containing the status update information 
along with the user name.
No Results (HTTP 404):

If the query returns an empty array (no matching status updates), the function sends a 404 Not Found response.
The response format is an object indicating that no results were found, with a relevant message.
Internal Server Error (HTTP 500):

If an error occurs during the execution of the function (for example, an error in the SQL query or a database connection issue), the catch block handles the error. It logs the error to the console and sends a 500 Internal Server Error response to the client.
The response format is an object indicating that there was an internal server error, with a relevant error message.

```js
export const getAllUpdates = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = /* sql */ `
            SELECT status_update.*, users.u_name  
            FROM status_update 
            JOIN users ON status_update.user_id = users.u_id  
            WHERE users.u_id=?
        `;

        const results = await query_db(sql, [id]);

        if (!results.length) {
            return res.status(404).send({
                success: false,
                message: 'No results found'
            })
        }

        return res.send(results[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};
```

---

#### getStatusUpdate

In the provided getStatusUpdate function, the return statements are used to 
 send responses back to the client based on the results of the database query. 
 Here's an explanation of the possible return values:
 
 ####  Successful Status Update:
  If the query to the database returns results (the results array is not empty), 
 the function sends a successful response with the first result found in the array. 
 This is achieved with the res.send(results[0]) statement. 
 The response format would be an object containing the status update information.
 
 Status Update Not Found (HTTP 404):
  If the query to the database returns an empty array (meaning no status updates 
  were found with the given ID), the function sends a 404 Not Found response.
  The response format is an object indicating that the update was not found, with 
  a relevant error message.
 
 Internal Server Error (HTTP 500):
  If an error occurs during the execution of the function (for example, an error 
  in the SQL query or a database connection issue), the catch block handles the error. 
  It logs the error to the console and sends a 500 Internal Server Error response to the client.
 
 The response format is an object indicating that there was an internal server error, with a 
 relevant error message.

 ```js
 export const getStatusUpdate = async(req, res) => {
    try {
        const { id } = req.params;

        const sql = /* sql */`
            select su.update_id, su.user_id, su.status_text, su.timestamp
            from status_updates as su
            where id=?
        `;

        const results = await query_db(sql, [id]);

        if (!results.length) {
            return res.status(404).send({
                success: false,
                error: 'update not found'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false, message: 'internal server error'
        });
    }
};
```