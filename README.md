# mikepres
An interactive presentation to showcase server sent events and controlling an arduino via johnny-five. Users 'vote' for their favorite color, and the connected RGB led will change to that color.

## Instructions:
- fork (optional) and clone this repo
- `npm i`
- `npm run build` to build client bundle **or** `npm run client:watch` to auto-build after any changes to `client/src/`
- `npm start [port]` to start server, optionally provide `port` to specify port number (default 3000) **or** `npm run server:watch` to auto-restart server after changes to `server/`
- navigate to `localhost:port` where port is your server port (default 3000)

## Notes:
This code currently does not open the connection to the arduino to avoid errors with no board plugged in. If you do have an arduino board you will have to edit the code in led.js to use the correct port, and invoke the connect function. 

## Server API:
- GET `/api/color`
  - Returns color data object:
    - `colors` array of color objects:
      - `hex` hex color code
      - `count` current vote count
    - `total` total number of votes
    - `winner` hex color code for color with highest # of votes
- SET `/api/color`
  - Returns all product documents
- GET `/api/streaming`
  - Opens and maintains the connection between server and client, adds client (response object) to an array, writes messages (events) to client.
