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

    config.get("/", PollController.index);
    config.get("/create", PollController.create);
    config.post("/store", PollController.store);
    config.get("/polls/:id", PollController.show);
    config.post("/polls/:id", PollController.storeOpinion);

    route.init()
    db.init()

    config.listen(3000, () => console.log("Listening on 3000"));
  }
}

app.init();