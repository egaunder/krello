const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();

app.listen(3000, () => console.log('listening on port 3000'))