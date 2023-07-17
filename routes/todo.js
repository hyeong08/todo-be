const express = require('express');
const { Posts } = require('../models');
const router = express.Router();

//// 1페이지

// TO-DO List 미완료 목록 조회
router.get('', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: { exclude: ['content', 'isDone', 'image'] },
    });
    res.status(200).json({ todo: posts });
  } catch (err) {
    res.status(400).json({ errorMessage: '조회 실패!' });
  }
});

// TO-DO List 완료 목록 조회
router.get('', async (req, res) => {});

// TO-DO List 작성
router.post('', async (req, res) => {
  const { title, content } = req.body;
  try {
    await Posts.create({ title, content });
    res.status(201).json({ msg: '작성 완료!' });
  } catch (err) {
    res.status(400).json({ errorMessage: '작성 실패' });
  }
});

// TO-DO List 미완료 상세 조회
router.get('/:todoId', async (req, res) => {});

// TO-DO List 완료
router.put('/:todoId/isDone', async (req, res) => {});

//// 2페이지

// TO-DO List 미완료 상세 수정
router.put('/:todoId', async (req, res) => {});

// TO-DO List 미완료 상세 삭제
router.delete('/:todoId', async (req, res) => {});

// TO-DO List 완료 목록 삭제
router.delete('/:todoId', async (req, res) => {});

module.exports = router;
