const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // NODE_ENV 환경변수가 없을때는 기본적으로 development db로 설정.
const config = require("../config/config.js")[env]; // 가져온 cofig객체에서 env에 해당하는 config설정값 가져옴
const db = {}; // model을 담아서 export해서 다른 파일에서 쓸 db객체 생성
const comment = require("./comment");
const hashtag = require("./hashtag");
const image = require("./image");
const post = require("./post");
const user = require("./user");
// sequelize는 mysql2를 사용하는데 mysql2에 정보를넘기고
// 연결 정보가 담김
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.Hashtag = hashtag;
db.Comment = comment;
db.Image = image;
db.Post = post;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
