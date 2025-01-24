const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Logs to the console
    new winston.transports.File({ filename: 'app.log' }), // Logs to a file
  ],
});

module.exports = logger;
