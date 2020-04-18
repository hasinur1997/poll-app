const mongoose = require("mongoose");

const dbConfig = {
    init: () => {
        mongoose
          .connect("mongodb://localhost:27017/mydb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then((res) => {})
          .catch((e) => {
            console.log(e);
        });
    }
}

module.exports = dbConfig;