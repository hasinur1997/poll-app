const express = require("express");
const PollController = require("./controllers/PollController");
const app = express();

const route = {
    init: () => {
        console.log('routelkdslkj');
        // app.get("/", PollController.index);
        // app.get("/create", PollController.create);
        // app.post("/store", PollController.store);
        // app.get("/polls/:id", PollController.show);
        // app.post("/polls/:id", PollController.storeOpinion);
    }
}

module.exports = route;