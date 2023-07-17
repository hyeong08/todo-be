require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_AWS_USERNAME,
    password: process.env.MYSQL_AWS_PASSWORD,
    database: process.env.MYSQL_AWS_DATABASE,
    host: process.env.MYSQL_AWS_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.MYSQL_AWS_USERNAME,
    password: process.env.MYSQL_AWS_PASSWORD,
    database: process.env.MYSQL_AWS_DATABASE,
    host: process.env.MYSQL_AWS_HOST,
    dialect: "mysql"
  },
  production: {
    username: process.env.MYSQL_AWS_USERNAME,
    password: process.env.MYSQL_AWS_PASSWORD,
    database: process.env.MYSQL_AWS_DATABASE,
    host: process.env.MYSQL_AWS_HOST,
    dialect: "mysql"
  }
}
