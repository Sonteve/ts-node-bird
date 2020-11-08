const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

// 프론트 로그인 사가부분에서 req.body에 {email,password}를 담아 /user/login으로 axios post요청을 한다.
// user router의 user/login라우터에 걸리고 그곳에서 req.body local전략에 넘겨주고 전략을 실행한다.
// 전략에서 done이 실행되면  user/login 라우터의 passport.authenticate의 callback부분이 실행되어
// 패스포트 로그인을 하게되고 로그인이 되면 serializeUser가 실행된다.

module.exports = () => {
  //req.login을 한다음에 성공 데이터를 받아서 serializeUser가 실행된다.
  passport.serializeUser((user, done) => {
    /* 세션에 정보를 다 들고 있기엔 너무 무거워서 세션에서는 
    user.id만 저장한다. */
    console.log("로그인성공");
    done(null, user.id); // 서버에러, 성공 데이터
  });
  // local실행후 serialize로 id만들고있다가 라우터에 접근하려고하면 그 전에 deserialize를 실행해서 그전에 저장했던 id를 바탕으로 유저정보 복구해서 가져온다음
  // req.user에 저장한다.

  passport.deserializeUser(async (id, done) => {
    console.log("deserial실행되어야함.");
    try {
      const user = await User.findOne({ where: { id } });
      /* 받아온 쿠키에 있는 userId로 그 유저정보 가져와서 req.user에 넣어줌  */
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
