const express = require("express");
const { User, Post } = require("../models"); // db.User
// 유저 비밀번호를 db에 그대로 저장하면 보안상 문제가 되기때문에 암호화를 위해 bcrypt라는 라이브러리 이용.
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

//로그인 유지
router.get("/", async (req, res, next) => {
  // GET /user
  try {
    console.log(req.headers);
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
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
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  // POST /user/
  try {
    const { email, nickname, password } = req.body;
    //회원가입 요청시 req.body의 email 값이 테이블 row내에 존재하는지 확인한다.
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
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
  // 세션지우고 쿠키 지우면 로그아웃 완료
  req.logout();
  req.session.destroy();
  return res.send("ok");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    return res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send("없는 사용자 입니다.");
    }
    await user.addFollowers(req.user.id);
    return res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//언팔로우
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send("없는 사용자 입니다.");
    }
    await user.removeFollowers(req.user.id);
    return res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 다른사람이 나를 팔로우 하는것 차단 (제거)
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send("없는 사용자 입니다.");
    }
    await user.removeFollowings(req.user.id);
    return res.status(200).json({ id: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//프로필화면

// 나를 팔로우 한사람
// GET /user/1/followers
router.get("/followers", isLoggedIn, async (req, res, next) => {
  // GET /user/followers
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "nickname"],
    });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }
    const followers = await user.getFollowers({
      attributes: ["id", "nickname"],
    });
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 내가 팔로잉한사람
// GET /user/1/followings
router.get("/followings", isLoggedIn, async (req, res, next) => {
  // GET /user/followings
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "nickname"],
    });
    if (!user) {
      res.status(403).send("없는 사람을 찾으려고 하시네요?");
    }
    const followings = await user.getFollowings({
      attributes: ["id", "nickname"],
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
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

    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방 으로 미리 length구해서 반환해준다.
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      return res.status(200).json(data);
    } else {
      return res.status(404).send("존재하지않는 사용자 입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
