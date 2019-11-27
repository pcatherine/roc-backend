const express = require('express');
const consign = require('consign');

const app = express();
// const fileUpload = require('express-fileupload');
// app.use(fileUpload());

consign({ verbose: false })
    .include('/libs/config.js')
    .then('db.js')
    .then('/common/common.js')
    // .then('cron.js')
    .then('auth.js')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);
