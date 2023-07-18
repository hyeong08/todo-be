const express = require('express');
const { Posts } = require('../models');
const router = express.Router();

//  1페이지

// TO-DO List 미완료 목록 조회
router.get('/incom', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { isDone: false },
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
    });
    res.status(200).json({ todo: posts });
  } catch (err) {
    res.status(400).json({ errMSG: '완료 목록 조회 실패' });
  }
});

// TO-DO List 완료 상세 목록 조회
router.get('/com/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({
      where: { postId, isDone: true },
    });

    if (post) {
      res.status(200).json({ todo: post });
    } else {
      res.status(404).json({ errMSG: '해당 포스트를 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '완료 상세 조회 실패' });
  }
});

// TO-DO List 미완료 상세 목록 조회
router.get('/incom/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({
      where: { postId, isDone: false },
    });

    if (post) {
      res.status(200).json({ todo: post });
    } else {
      res.status(404).json({ errMSG: '해당 포스트를 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '미완료 상세 조회 실패' });
  }
});

// TO-DO List 작성
router.post('', async (req, res) => {
  const { title, content } = req.body;
  try {
    await Posts.create({ title, content });
    res.status(201).json({ MSG: '게시글 생성 성공' });
  } catch (err) {
    res.status(400).json({ errMSG: '게시글 생성 실패' });
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

      res.status(200).json({ msg: '할일 달성' });
    } else {
      res.status(404).json({ errMSG: '할 일은 현재 존재하지 않습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '업데이트 실패' });
  }
});

// TO-DO List 완료 취소
router.patch('/cancellation/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ where: { postId } });

    if (post) {
      post.isDone = false;
      await post.save();
      res.status(200).json({ mag: '완료 취소' });
    } else {
      res.status(404).json({ errMSG: '해당 하는 할 일을 찾을 수 없습니다.' });
    }
  } catch (err) {
    res.status(400).json({ errMSG: '업데이트 실패' });
  }
});

// 목록 삭제 API
router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Posts.findOne({ where: { postId } });

    if (!post) {
      res.status(404).json({ errMSG: '이미 삭제된 메세지 입니다.' });
      return;
    }
    await post.destroy();
    res.status(200).json({ msg: '삭제 성공' });
  } catch (err) {
    res.status(400).json({ errMSG: '삭제 실패' });
  }
});

// 목록 수정 API (title과 content)
router.patch('/incom/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const post = await Posts.findOne({ where: { postId } });

    if (!post) {
      res.status(404).json({ errMSG: '해당하는 할 일은 없습니다.' });
      return;
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ MSG: '수정 성공' });
  } catch (err) {
    res.status(400).json({ errMSG: '수정 실패' });
  }
});

module.exports = router;
