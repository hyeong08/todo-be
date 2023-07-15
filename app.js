const express = require('express');
const { sequelize } = require('./models');

const app = express();
const router = require('./routes');

require('dotenv').config();

app.use(express.json());
app.use('/api', router);

app.listen(process.env.PORT, async () => {
  console.log('server started!');
  await sequelize.authenticate();
  console.log('db authenticated!');
});
