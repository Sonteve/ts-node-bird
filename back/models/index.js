const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // NODE_ENV 환경변수가 없을때는 기본적으로 development db로 설정.
const config = require("../config/config.json")[env]; // 가져온 cofig객체에서 env에 해당하는 config설정값 가져옴
const db = {}; // model을 담아서 export해서 다른 파일에서 쓸 db객체 생성

// config의 정보를 받아서 sequelize가 mysql2에 넘기면 그 config정보에 해당하는mysql db를 node와 연결시킴.
// 연결 후 sequelize객체에 그 정보가 담김
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 생성된 sequelize객체와, Sequelize(Datatype)를 넘겨서 모델을 정보를 불러온다.
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  // ["Comment", "Hashtag", "Image", "Post", "User"]
  // 반복문 돌면서 관계가 있으면 테이블 관계를 연결시켜줌
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
