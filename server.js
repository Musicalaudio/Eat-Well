const mongoose = require("mongoose");
const { createApp } = require("./app");
require("dotenv").config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("Mongodb database connection established successfully");
});

const app = createApp();

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
