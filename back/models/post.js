module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    // id는 기본적으로 생성 (auto increase)
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글, 이모티콘까지 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 게시글과 유저간의 1:N관계
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 해시태그와의 N: M관계
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 컬럼명 PostId => RetweetId됨
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 좋아요 누른사람
  };
  return Post;
};
