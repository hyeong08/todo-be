const express = require('express');
const { sequelize } = require('./models');
const cors = require("cors");

const app = express();
const router = require('./routes');
const corsOptions = {
  origin: '*',
  credentials: true,
}

require('dotenv').config();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router);


app.listen(process.env.PORT, async () => {
  console.log('server started!');
  await sequelize.authenticate();
  console.log('db authenticated!');
});
