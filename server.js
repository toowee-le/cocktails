// Express to run server and routes
const express = require('express');

// Start up Express
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Init the main project folder
app.use(express.static('public'));

const port = 8000;
// Start the server
const server = app.listen(port, () => {console.log(`server running on localhost: ${port}`)});