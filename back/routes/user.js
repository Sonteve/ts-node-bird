const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
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
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500 (server error)
  }
});

module.exports = router;
