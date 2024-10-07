const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./Routes/routes");
const dataBase = require("./Modal/mongooes/mongooes");
const passport = require("./middleWere/passport");
const expressSession = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = 2020;
const drName = path.join(__dirname, "/Views");

app.set("view engine", "ejs");
app.set("Views", drName);

app.use(
  expressSession({
    secret: "Jay Hooo",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(drName));
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use(flash());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Your Server Is Running On http://localhost:${PORT}`);
});
