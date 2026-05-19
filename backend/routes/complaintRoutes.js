const express = require('express');
const { body } = require('express-validator');
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  searchComplaintsByLocation,
  deleteComplaint
} = require('../controllers/complaintController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/complaints
// @desc    Create a new complaint
// @access  Private
router.post('/', protect, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('location').trim().notEmpty().withMessage('Location is required')
], createComplaint);

// @route   GET /api/complaints
// @desc    Get all complaints
// @access  Private
router.get('/', protect, getAllComplaints);

// @route   GET /api/complaints/search
// @desc    Search complaints by location
// @access  Private
router.get('/search', protect, searchComplaintsByLocation);

// @route   GET /api/complaints/:id
// @desc    Get single complaint
// @access  Private
router.get('/:id', protect, getComplaintById);

// @route   PUT /api/complaints/:id
// @desc    Update complaint status
// @access  Private
router.put('/:id', protect, [
  body('status').trim().notEmpty().withMessage('Status is required')
], updateComplaintStatus);

// @route   DELETE /api/complaints/:id
// @desc    Delete complaint
// @access  Private
router.delete('/:id', protect, deleteComplaint);

module.exports = router;
