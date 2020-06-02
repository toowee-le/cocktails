// Express to run server and routes
const express = require('express');
const app = express();

const Datastore = require('nedb');

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const appData = new Datastore('favorites.db');
appData.loadDatabase();

// Set GET route
app.get('/api/favorites', (req, res) => {
    appData.find({}, (err, data) => {
        if(err) {
            res.end();
            return;
        }
        res.json(data);
    });
});

// Set POST route/endpoint
app.post('/api/favorites', (req, res) => {
    const data = req.body;
    appData.insert(data);
    console.log(data);
    res.json(data);
})

// Init the main project folder
app.use(express.static('public'));

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on localhost: ${port}`));