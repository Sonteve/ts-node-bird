const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  // 모델 클래스에서 상속받은 init메서드사용해야 테이블 생성됨
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Hashtag",
        tableName: "hashtags", //안적어주면 자동으로 소문자 복수형
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  }
};

/* module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
 */
