// Express to run server and routes
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const appData = [];

// Init the main project folder
app.use(express.static('public'));

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on localhost: ${port}`));