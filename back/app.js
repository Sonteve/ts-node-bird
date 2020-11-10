const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");
// models/index.js에서 model이 등록된 sequelize를 가져옴
const db = require("./models/index.js");
const passport = require("passport");
const passportConfig = require("./passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

dotenv.config();
const app = express();
//sequelize.sync() =>  Promise기반 함수
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // 자세한 로그( 접속자의 ip도 나옴 )
} else {
  app.use(morgan("dev")); // 개발모드에서만 로그 찍어줌 (디버깅 편함)
  app.use(
    cors({
      // credentials : true일때는 모든도메인허용불가하므로 정확한 도메인을 적어주어야한다. 또는 origin: true 로 해준다.
      origin: true, // 모든 도메인으로 부터의 요청 허용 (도메인이 다르면 cors에러가남.) 프론트를 3060 백은 3065이기때문
      credentials: true, // 도메인이 다르면 쿠키가 전달이 안되는데 쿠키를 보내려면 credentails를 true로 해줘야함.
      // front에서는 axios요청의 세번째 인자로 { withCredentials: true} 를 넣어줘야 쿠키가 동봉된다.
    })
  );
}

// 프론트에서 body에 보내온 데이터를 해석해준다.
// 라우터에 걸리면 미들웨어가 종료되기때문에 상단에 위치시켜준다.

//  app.use("/", express.static(path.join(__dirname, "uploads")));  => localhost:3065/이미지파일.png (프론트에서 서버쪽 폴더구조 모르게할 수 있다.)
app.use("/", express.static(path.join(__dirname, "uploads"))); // __dirname(back)과 uploads경로를 합쳐준다. 운영체제 마다 경로가 차이나기때문에 path.join을쓴다.(/ or \)
app.use(express.json()); // json으로 넘어오는 데이터를 해석 해서  req.body에 넣어준다. (axio를 통해 받을때)
app.use(express.urlencoded({ extended: true })); // form submit시의 데이터를 해석해서 req.body에 넣어 준다 .  (일반 form데이터를 받을때)
/*쿠키에 랜덤한 문자열 정보를 넘기고 브라우저에서 서버로 요청할때 
쿠키를 담아서 보내면 그 랜덤한 문자열에 해당하는 정보를 찾는다.*/
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

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/hashtag", hashtagRouter);

// 에러처리 미들웨어 존재하는부분
/* 
(기본 에러표시를 바꾸고 싶다면 생성해서 사용한다.)
app.use((err,req,res,next) => {})
*/

app.listen(3060, () => {
  console.log("3065포트에서 대기중");
});
