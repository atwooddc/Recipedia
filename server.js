const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// use built in express body parser
app.use(express.json());

// Set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
