const express = require("express");
const { Post, Image, User, Comment } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기로딩이 아닐때
      // 초기로딩시 프론트에서 lastId가 0으로 온다
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"], // 게시글의 생성일로 정렬
        [Comment, "createdAt", "DESC"], // 댓글 정렬
      ],
      // ASC 1,2,3,4,5
      // DESC 5,4,3,2,1
      include: [
        {
          // 게시글의 이미지
          model: Image,
        },
        {
          // 게시글의 작성자
          model: Comment,
          include: [
            {
              // 게시글 작성자
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          // 글 작성자 정보
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          // 좋아요 누른 사람
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
