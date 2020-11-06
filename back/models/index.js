const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

// sequelize는 mysql2를 사용하는데 mysql2에 정보를넘기고
// 연결 정보가 담김
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
