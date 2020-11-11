const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  // 모델 클래스에서 상속받은 init메서드사용해야 테이블 생성됨
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Image",
        tableName: "images", //안적어주면 자동으로 소문자 복수형
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User); // 게시글과 유저간의 1:N관계 // Post.addUser, post.getUser
    db.Post.hasMany(db.Comment); // Post.addComments, post.getComments
    db.Post.hasMany(db.Image); // Post.addImages(복수), post.getImages
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 해시태그와의 N: M관계 // Post.addHashtags
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 컬럼명 PostId => RetweetId됨  // Post.addRetweet
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 좋아요 누른사람
    // Post.addLikers , Post.removeLikers 생김
    // 관계 정의시 add,get,set 메서드가생김
    // belongsTo는 단수
    // hasMany, belongsToMany 는 복수
  }
};
/* 
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 게시글과 유저간의 1:N관계 // Post.addUser, post.getUser
    db.Post.hasMany(db.Comment); // Post.addComments, post.getComments
    db.Post.hasMany(db.Image); // Post.addImages(복수), post.getImages
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 해시태그와의 N: M관계 // Post.addHashtags
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 컬럼명 PostId => RetweetId됨  // Post.addRetweet
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 좋아요 누른사람
    // Post.addLikers , Post.removeLikers 생김
    // 관계 정의시 add,get,set 메서드가생김
    // belongsTo는 단수
    // hasMany, belongsToMany 는 복수
  };
  return Post;
}; */
