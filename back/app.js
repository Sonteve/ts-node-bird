const express = require("express");
const app = express();
const dotenv = require("dotenv");
const postRouter = require("./routes/post");
const db = require("./models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportConfig = require("./passport");
const passport = require("passport");

const userRouter = require("./routes/user");
dotenv.config();

const PORT = process.env.PORT;

db.sequelize
  .sync()
  .then(() => {
    console.log("연결성공");
  })
  .catch(() => {
    console.log("연결실패");
  });
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>Test Express</h1>");
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 1, content: "hello" },
    { id: 1, content: "hello" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 대기중..`);
});
