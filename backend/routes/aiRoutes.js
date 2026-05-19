const express = require('express');
const { body } = require('express-validator');
const { analyzeComplaint } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/ai/analyze
// @desc    Analyze complaint using AI
// @access  Private
router.post('/analyze', protect, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
], analyzeComplaint);

module.exports = router;
