const express = require("express");
const { User, Post } = require("../models"); // db.User
// 유저 비밀번호를 db에 그대로 저장하면 보안상 문제가 되기때문에 암호화를 위해 bcrypt라는 라이브러리 이용.
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);

      /* const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      }); */
      return res.status(200).json(user);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//회원가입
router.post("/", isLoggedIn, async (req, res, next) => {
  // POST /user/
  try {
    const { email, nickname, password } = req.body;
    //회원가입 요청시 unique한 column인 email이 테이블 row내에 존재하는지 확인한다.
    const existUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existUser) {
      // 이미 존재 email이라면
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    console.dir(typeof user, { depth: 5 });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    next(error); // status 500 (server error)
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  //Post /user/login
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러가있다면 front로 status 401만들고 에러데이터 전송
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      } // passport 에러처리

      /*서버에는 세션에 로그인 정보에 해당하는 데이터를 통째로 들고있고 
      response의 header로 랜덤문자열을 담은 쿠키를 같이 보낸다.
      이후 브라우저에서 서버와 request를 할때 header에 이 랜덤문자열을
      담은 쿠키를 같이 보내고 받은 쿠키의 정보로 서버에서는 클라이언트가 누구인지 확인한후
      통신을 하게된다.(보안에 대한 취약점을 막기 위해서 하는 장치이다.)
      여기서 모든 사용자에 대한 모든 정보를 다 들고있으면 너무 무거워지기때문에
      평소에 세션에는 유저들의 아이디만 가지고있고 그 유저에대한 정보를 확인해야할때면
      db에 id로 그 유저에대한 정보를 가져와서 위의 과정을 수행한다.
      
      res.setHeader('Cookie','랜덤문자열');
      */

      // 클라이언트로 쿠키와 유저 정보 보내줌

      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  //Post /user/logout
  console.log("req.user", req.user);
  req.logout();
  req.session.destroy();
  res.status(200).send("ok");
});

module.exports = router;
