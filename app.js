const express = require('express')
const morgan = require('morgan')
const route = require('./route')
const db = require('./database/config')
const PollController = require("./controllers/PollController");

const app = {
  init: () => {
    const config = express();

    config.set("view engine", "ejs");
    config.use(morgan("dev"));
    config.use(express.urlencoded({ extended: true }));
    config.use(express.json());
    config.set("base", "/poll");
    config.use("/", route);
    db.init()

    config.listen(3000, () => console.log("Listening on 3000"));
  }
}

app.init();