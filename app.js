'use strict'

const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const cors = require('cors')();
const router = require('./routes');

let app = express();

app.use(express.static(path.join(__dirname, 'public')))
<<<<<<< HEAD
	.use(express.static(path.join(__dirname, 'views')))
=======
>>>>>>> e69ebe7e4b3c7f90c9cdd60c8aec96bec2ab681f
	.use(BodyParser.json())
	.use(BodyParser.urlencoded({ extended: false }))
	.use(CookieParser())
	.use(cors)
	.use(Session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	}))
	.use('/', router)
//	.set('port', process.env.PORT || 5001);

module.exports = exports = app;
