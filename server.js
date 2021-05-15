const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

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

app.use(express.static("client/build"));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use("/api/items", items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
