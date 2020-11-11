const express = require("express");
const { Post, User, Comment, Image, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads폴더가 없으므로 생성");
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

// localStorage에서 s3로 변경
const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(), // 권한 얻기
    bucket: "node-bird-s3", // 버킷이름
    key(req, file, cb) {
      // 저장될 파일 이름 설정
      cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 이미지 용량 설정
});

/* const upload = multer({
  storage: multer.diskStorage({
    //경로 설정
    destination(req, res, done) {
      done(null, "uploads"); // 이미지 파일 저장할 경로
    },
    filename(req, file, done) {
      // 이미지 덮어씌우는것을 방지하기위한 절차.
      // 업로드된 이미지 file.originalname = sonteve.png;
      const ext = path.extname(file.originalname); // 확장자 추출(ex , png) ext = .png
      const basename = path.basename(file.originalname, ext); //sonteve.png에서 sonteve만 꺼내온다. basename = sonteve
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
}); */

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    console.log("작성글은", post);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      );
      // 해시태그 모델 객체가 반환되는데 2차원배열이기때문에 배열의 [0]번째로 다시 배열을 만들어서 addHashtags 해준다.
      console.log("해시태그는", result);
      await post.addHashtags(result.map((v) => v[0]));
    }

    // 이미지가 전송 되었을경우
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지 여러개올린경우(배열인경우)
        // image테이블의 src column에 전송된 이미지 주소를 등록하고
        const images = await Promise.all(
          req.body.image.map((image) =>
            Image.create({
              src: image,
            })
          )
        );
        /* console.log("images", images); */
        await post.addImages(images);
      } else {
        // 이미지를 하나 올린경우
        const image = await Image.create({ src: req.body.image });
        console.log("이미지..어떻게 생겼니", image);
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: {
        id: comment.id,
      },
      attributes: ["content", "PostId"],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.addLikers(req.user.id);
    res.status(201).send({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.status(201).json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE /post/1
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(200).json({ PostId: req.params.postId });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST post/images
router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    console.log(req.files);
    // 서버 로컬에 이미지 파일 생성후 req.files에 담겨서 온다.
    res.status(200).json(req.files.map((v) => /* v.filename */ v.location));
  }
);

router.delete("/image/:imageName", async (req, res, next) => {
  console.log(req.params.imageName);
  try {
    fs.statSync(`uploads/${req.params.imageName}`);
    console.log("파일있음");
    fs.unlinkSync(`uploads/${req.params.imageName}`);
    return res.status(200).json({ filename: req.params.imageName });
  } catch (error) {
    console.log("폴더가 없거나 파일이 없습니다.");
    next(error);
  }
});

router.post("/:postId/retweet", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
    });
    console.log(post);
    if (post.Retweet?.UserId === req.user.id || req.user.id === post.UserId) {
      return res.status(403).send("자신의 글은 리트윗 할 수 없습니다.");
    }

    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: post.id,
      },
    });

    if (exPost) {
      return res.status(403).send("이미 리트윗 한 게시글 입니다.");
    }

    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: post.id,
      content: post.content,
    });

    const fullRetweetWithPost = await Post.findOne({
      where: {
        id: retweet.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });

    return res.status(201).json(fullRetweetWithPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /post/1
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      console.log("없는 페이지라고");
      return res.status(403).send("존재하지 않는 게시글 입니다.");
    }
    console.log("글 존재한다.");
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
