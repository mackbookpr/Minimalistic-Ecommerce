const express = require('express');

// Define your static middleware
const staticMiddleware = express.static('Public');

module.exports = staticMiddleware;
