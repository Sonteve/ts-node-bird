const expess = require("express");
const postRouter = require("./routes/post");
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(() => {
    console.log("db 연결 실패");
  });

const app = expess();
app.set("PORT", 3065);
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("<h1>hello express</h1>");
});

app.listen(app.get("PORT"), () => {
  console.log("서버 실행중..");
});
