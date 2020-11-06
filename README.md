# Node bird

## backend

### express

- sequelize

```
 : ORM의 한 종류이고 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구이다.
(node를 mysql db와 연결시켜준다. javascript 구문을 알아서 sql로 바꿔준다.
```

- 필요 패키지

```
sequelize
sequelize-cli (sequelize 명령어 사용가능하게 해줌)
mysql2(node와 mysql연결해주는 드라이버, query로 직접 쓸수도 있다.)
```

- 설치후

```
npx sequelize init(기본적인 sequelize에 필요한 파일들 생성해줌) global로 설치하지 않았기 때문에 local에 sequelize-cli를 설치하고 npx를 붙여서 실행시켜야함.
테이블간의 관계를 작성한다.
```

- 예시

```javascript
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });

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
  };
  return User;
};
```

```
위처럼 model을 작성하며 DataTypes에는
STRING, TEXT(긴글), BOOLEAN, INTEGER, FLOAT, DATETIME 등이 있다.
비밀번호는 단방향 암호화해서 저장할 것이기 때문에 length를 넉넉하게 잡아준다.
```

- npx sequelize db:create

```
npx sequelize db:create (db생성) :  !! db만 생성해준다.!! 테이블은 db.sync(promise를 return함) 연결시 생성된다.
```

- 1: N (1 대 다 관계)

```
1(hasMany): N(belongsTo) 관계에서 N에해당하는 테이블에 생성되는 column명은 as로 바꿀수있다.
N(다수 쪽)에 속하는 테이블에서는 관계정의시 belongsTo를 적어주게되며 관계된 1의 테이블을 참조하기위한 Id가 필요한데 sequelize가 상대 테이블을 참조할수있는 id값을 column에 추가 해 준다.
ex) 유저와 작성글의 관계(한명의 유저는 여러글을 작성 할 수 있고 하나의 글은 작성자가 한명의 유저이다.)
    리트윗(글과 글의관계)( 하나의 글은 여러 개의 글로 복사 될 수 있고 그 글의 원본은 하나의 글이다.)
    작성글과 댓글의 관계(하나의 글에는 여러개의 댓글이 달릴 수 있고 그 댓글이 작성된 글은 하나의 글이다.)
    유저와 댓글의 관계(유저는 여러개의 댓글을 작성 할 수 있고 그 작성된 댓글은 한명의 유저의 댓글이다.)
    작성글과 이미지의 관계(하나의 글에는 여러개의 이미지가 등록될수있으며 그 이미지는 하나의 글에 포함된 이미지이다.)
```

- N : M (다 대 다 관계)

```
N(belongsToMany) : M (belongsToMany) 관계는 꼭 중간 테이블이 필요하며 model/index.js 에서 모델과 관계가 담긴 db를 import 해와서 db.sync()시 생성된다.
db.sync()로 테이블 생성시 default로 createdAt updatedAt이 생성됨.(옵션으로 default바꿀수있음)
through로 중간 테이블의 이름을 정할수있으며 정하지 않을경우 두 테이블의 이름을 합친것이 중간테이블의 이름이 된다.
예를 들어 user post간의 좋아요 관계 ( N : M )를 보면
한명의 유저는 여러글에 좋아요를 누를 수 있고 한개의 글에는 여러명의 유저가 좋아요를 누를 수 있다.
중간테이블의 이름은 through에 Like라고 적을시 Like로 생성된다. (양쪽 model에 꼭 적어줘야한다.)
column은 createdAt updatedAt  UserId PostId로 된다. as는 관계의 별칭이며 나중에 불러와서 함수로 유용하게 사용가능하다.(ex getLikers, getLiked)
같은 테이블간에 N: M관계를 가지면 중간테이블에 column명이 중복되기때문에 서로 관계를 참조할수있게 foreignKey를 이용한다.
예를들면 유저와 유저간의 팔로잉 팔로워 관계를 보면
한명의 유저는 여러명의 유저를 팔로우 할 수 있고 한명의 유저는 여러명의 유저들에게 팔로잉 될 수 있다.
N:M 테이블이기때문에 column은 [UserId, UserId]로 중복이 되게되고 foreignKey를 이용하여
db.User.belongsToMany(db.User, { through: "Follow",  as: "Followers",  foreignKey: "FollowingId",   });
db.User.belongsToMany(db.User, { through: "Follow",  as: "Followings", foreignKey: "FollowerId"   }); 이런식으로 해주면
column이 [FollowingId, FollowerId]로 생성되고 FollowerId가 궁금하면 FollowingId로 참조 할수있고 역으로도 참조하면 된다.
ex) 유저와 작성글의 좋아요관계(유저는 여러글에 좋아요를 누를 수있고 글은 여러 유저로부터 좋아요를 받을 수 있다.)
     유저와 유저간의 팔로잉관계(유저는 여러명의 유저를 팔로잉 할 수 있고 유저는 여러명의 유저로 부터 팔로잉 될 수 있다.)
     작성글과 해시태그간의 관계(하나의 작성글은 여러 해시태그를 가질 수 있고 하나의 해시태그는 여러 글에 속할 수 있다.)

```
