const express = require('express');
const cors = require('cors')
const server = express();

//router
const apiRouter = require("./api-routes/api-router")

server.use(express.json());
server.use(cors());

server.use("/api/posts", apiRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Node API II Project</h>
    <p>Server Side Routing w/ Express</p>
  `);
});


// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});
