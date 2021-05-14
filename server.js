const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();
const server = require("http").createServer(app);

app.use(bodyParser.json());

const MONGO_URI = require("./config/keys").MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo has just successfully connected."))
  .catch((err) => console.log(err));

app.use("/api/items", items);

app.get("/", (req, res) => res.send("Homepage"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
