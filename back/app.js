const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const cors = require("cors");
app.set("PORT", 3060);

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(() => {
    console.log("db 연결 실패");
  });
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>hello express</h1>");
});

app.listen(app.get("PORT"), () => {
  console.log(`${app.get("PORT")}에서 서버 실행중...`);
});
