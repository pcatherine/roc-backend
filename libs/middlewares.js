const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');


module.exports = app => {
    app.set('port', process.env.PORT);
    app.use(express.json({ limit: '50mb' }));
    app.use(bodyParser.json());

    app.use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(compression());
    // app.use(app.auth.initialize());

    app.db.sequelize.sync();

};