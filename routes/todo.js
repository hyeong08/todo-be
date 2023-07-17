const express = require('express');
const { Posts } = require('../models');
const router = express.Router();

//  1페이지

// TO-DO List 미완료 목록 조회
router.get('/incom', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { isDone: false },
      attributes: ['postId', 'title', 'content', 'updatedAt'],
    });
    res.status(200).json({ todo: posts });
  } catch (err) {
    res.status(400).json({ errMSG: '조회 실패' });
  }
});

// TO-DO List 완료 목록 조회
router.get('/com', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { isDone: true },
      attributes: ['postId', 'title', 'content', 'updatedAt'],
    });
    res.status(200).json({ todo: posts });
  } catch (err) {
    res.status(400).json({ errMSG: '조회 실패' });
  }
});

// TO-DO List 완료 상세 목록 조회
router.get('/com/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findOne({
      where: { postId, isDone: true },
      attributes: ['postId', 'title', 'content', 'updatedAt'],
    });

    if (post) {
      res.status(200).json({ todo: post });
    } else {
      res.status(404).json({ errMSG: '해당 포스트를 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '조회 실패' });
  }
});

// TO-DO List 미완료 상세 목록 조회
router.get('/incom/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findOne({
      where: { postId, isDone: false },
      attributes: ['postId', 'title', 'content', 'updatedAt'],
    });

    if (post) {
      res.status(200).json({ todo: post });
    } else {
      res.status(404).json({ errMSG: '해당 포스트를 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '조회 실패' });
  }
});

// TO-DO List 작성
router.post('', async (req, res) => {
  const { title, content } = req.body;

  try {
    await Posts.create({
      title: title,
      content: content,
    });
    res.status(201).json({ msg: '게시글 생성 성공' });
  } catch (err) {
    res.status(400).json({ msg: '게시글 생성 실패' });
  }
});

// TO-DO List 완료
router.patch('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findOne({ where: { postId } });

    if (post) {
      post.isDone = true;
      await post.save();

      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ errMSG: '해당 포스트를 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '업데이트 실패' });
  }
});

//? 2페이지

// TO-DO List 미완료 상세 수정
router.put('/:todoId', async (req, res) => {});

// TO-DO List 미완료 상세 삭제
router.delete('/:todoId', async (req, res) => {});

// TO-DO List 완료 목록 삭제
router.delete('/:todoId', async (req, res) => {});

module.exports = router;
