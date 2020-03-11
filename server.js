const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");
// const db = config.get("mongodbURI");

const app = express();

const PORT = process.env.PORT || 5000;

//Connect to db
mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/api/items"));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
