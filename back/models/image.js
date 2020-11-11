const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Image extends Model {
  // 모델 클래스에서 상속받은 init메서드사용해야 테이블 생성됨
  static init(sequelize) {
    return super.init(
      {
        src: {
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
    db.Image.belongsTo(db.Post);
  }
};

/* module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
 */
