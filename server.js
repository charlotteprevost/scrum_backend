require('dotenv').config();

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const cors           = require('cors');
const session        = require('express-session');
// const request 		 = require('superagent');

require('./db/db');

// app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "This is a string, the string of strings",
  resave: false,
  saveUninitialized: false // legal
}));

// Getting error 413 (Payload too large)
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
app.use(bodyParser.json({limit: '50mb'}));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


const authController 	 = require('./controllers/authController.js');
const userController 	 = require('./controllers/userController.js');
const scrumController 	 = require('./controllers/scrumGameController.js');
// const roundController 	 = require('./controllers/roundController.js');
// const voteController 	 = require('./controllers/voteController.js');
// const gitHubController    = require('./controllers/gitHubController.js');

app.use('/auth', authController);
app.use('/api/v1/users', userController);
app.use('/api/v1/scrums', scrumController);
// app.use('/api/v1/rounds', roundController);
// app.use('/api/v1/votes', voteController);
// app.use('/gitHub', gitHubController);


app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
	const today = new Date();
	console.log(today.toLocaleDateString('en-US') + ': ' + today.toLocaleTimeString('en-US'));
});