const express = require("express");
const { Post, User, Comment, Image } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads폴더가 없으므로 생성");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, "uploads");
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
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (req.body.image) {
      /* console.log("req.body.image", req.body.image); */
      if (Array.isArray(req.body.image)) {
        // 이미지 여러개올린경우
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
    res.status(200).json(req.files.map((v) => v.filename));
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
module.exports = router;
