const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  // 모델 클래스에서 상속받은 init메서드사용해야 테이블 생성됨
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "users", //안적어주면 자동으로 소문자 복수형
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  }
};

/* module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  };
  return User;
};
 */
