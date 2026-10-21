/**
 * Service routes: /api/services
 * Public read access, admin-only writes.
 */
const express = require('express');
const { body, param } = require('express-validator');

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

const serviceRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title is too long'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description is too long'),
  body('imageUrl').optional({ checkFalsy: true }).isURL().withMessage('imageUrl must be a valid URL'),
  body('isActive').optional().isBoolean().withMessage('isActive must be true or false'),
];

const idParam = [param('id').isMongoId().withMessage('Invalid service id')];

// Public
router.get('/', getServices);
router.get('/:id', idParam, validate, getServiceById);

// Admin only
router.post('/', protect, serviceRules, validate, createService);
router.put('/:id', protect, [...idParam, ...serviceRules], validate, updateService);
router.delete('/:id', protect, idParam, validate, deleteService);

module.exports = router;
