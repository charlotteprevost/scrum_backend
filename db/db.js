const mongoose = require('mongoose');

const connectionStr = process.env.MONGOD_URI || "mongodb://localhost/scrum";
mongoose.connect(connectionStr);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected ');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose error ', err);
});
