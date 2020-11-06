const express = require("express");
const { Post, Image, User, Comment } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

//Post /post
router.post("/", isLoggedIn, async (req, res, next) => {
  // Post /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (!post) {
      return res.status(401).send("잘못된 요청입니다.");
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
          attribute: ["id"],
        },
      ],
    });
    return res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Post /post/:postId/comment
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  const post = await Post.findOne({
    where: { id: req.params.postId },
  });
  if (!post) {
    return res.status(403).send("없는 글 입니다.");
  }
  const comment = await Comment.create({
    content: req.body.content,
    UserId: req.user.id,
    PostId: req.params.postId,
  });

  const fullComment = await Comment.findOne({
    where: {
      id: comment.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
      },
    ],
  });

  return res.status(201).json(fullComment);
});

// Delete /post
router.delete("/", isLoggedIn, (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
