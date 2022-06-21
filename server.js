const express = require("express");
const app = express();
const port = 3000;
const db = require("./db/db");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
require("dotenv").config();
app.use(express.static("client"));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date()} ${req.method} ${req.path}`);
  next();
});

app.use(
  expressSession({
    store: new pgSession({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);

// Write code here
const usersControls = require("./controllers/users");
const sessionControls = require("./controllers/session");
const parentsControls = require("./controllers/parents");
const kidControls = require("./controllers/kids");

app.use("/api/users", usersControls);
app.use("/api/session", sessionControls);
app.use("/api/parents", parentsControls);
app.use("/api/kids", kidControls);
//

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
