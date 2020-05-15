const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const morgan = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const {setCORS} = require('./src/config/cors-config');
const swaggerOptions = require('./src/config/swagger-config');
const {errorMiddleware} = require('./src/middlewares/errorMiddleware');
const {morganMiddleware} = require('./src/middlewares/morganMiddleware');
const {errorLoggingMiddleware, logger} = require('./src/services/loggerService');
const {PORT, JWT_SECRET} = require('./src/enviroment/enviroment');

const {
  authRoutes, userRouters
} = require('./src/controllers/initRoutes');
const defaultPort = 3000;
const swaggerDocs = swaggerJsdoc(swaggerOptions);

//db connection
const sequelize = require('./src/db/connection');
sequelize.authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Unable to connect to the database:', err);
  })

const app = express();

app.use((morgan(morganMiddleware, { stream: logger.stream })));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jwt({secret: JWT_SECRET})
.unless({
    path: [
      '/api/auth/sign-in',
      '/api/auth/sign-up'
    ]
}));

app.use(setCORS);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRouters);

// logging error
app.use(errorLoggingMiddleware);
app.use(errorMiddleware);

app.listen(PORT || defaultPort, () => console.log(`App listening on port ${PORT || defaultPort}`));