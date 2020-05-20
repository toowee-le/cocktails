// Express to run server and routes
const express = require('express');
const Datastore = require('nedb');

const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const appData = new Datastore('database.db');
appData.loadDatabase();

// Create GET route
app.get('/api', (req, res) => {
    appData.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    })
});

// Set POST route/endpoint
app.post('/api/cocktails', (req, res) => {
    console.log('I got a request!');
    const data = req.body.drinks;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    appData.insert(data);
    res.json(data);
})

// Init the main project folder
app.use(express.static('public'));

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on localhost: ${port}`));