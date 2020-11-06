const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // req.body에 대한 설정
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        //로그인 전략
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, {
              reason: "존재하지 않는 사용자 입니다.",
            }); // done(서버에러, 성공객체, 클라이언트에러) done의 파라미터는 routes/user.js 의 passport.authenticate로 전달된다.
          }
          // 클라이언트에서 받아온 비밀번호와 db의 email과 일치하는 password를 비교
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // 비밀번호 일치시 db의 user데이터 넘김
            return done(null, user); // done은 콜백함수 같은것
          }
          //비밀번호 불일치시
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
