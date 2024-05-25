const cors = require('cors');

const corsMiddleWare = cors({
    origin: 'http://localhost:3000',
});

module.exports = corsMiddleWare;