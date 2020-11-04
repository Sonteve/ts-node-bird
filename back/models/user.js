module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // STRING, TEXT(긴글), BOOLEAN, INTEGER, FLOAT, DATETIME
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // 암호화 해서 저장할것이기때문
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // through없으면 UserPost로 생성됨 [UserId : PostId]

    //user에게 좋아요 눌러진 글들
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    }); // [UserId , UserId]
    // 다대다 관계에서 같은 테이블간에 관계를 가지면
    // 컬럼명이 같게 두개 생기게때문에 foreignKey로 컬럼명을 바꿔준다.
  };
  return User;
};

/* through로 N : M 관계에서 sequelize가 생성해주는 중간테이블의 이름을
 정할수 있다. 관계 테이블에도 같이 through를 적어줘야한다. */
