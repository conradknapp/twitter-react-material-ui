const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
require("./models/User");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const passportConfig = require("./passportConfig");
require("dotenv").config({ path: "variables.env" });

passportConfig(passport);
// Setup mongoose to connect to MLab
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

require("./routes/api")(app, io);
app.use("/auth/twitter", authRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
