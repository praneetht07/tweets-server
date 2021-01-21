const express = require('express')
const cors = require('cors');

const tweetRoute = require('./routes/tweets');

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.use('/tweets', tweetRoute);
app.listen(port, () => console.log(`Server is listening on ${port}`))