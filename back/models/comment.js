module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 1:N 관계에서 N관계의 테이블(belongsTo를 사용한)은 1의 id값을 column으로 받아온다.
      // 한 columne에는 배열안되고 하나의 데이터만 들어가야해서 N 관계의 테이블에서 참조한다.
      //userId: 1
      //postId: 3
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
