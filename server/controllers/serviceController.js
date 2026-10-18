/**
 * Service controllers - CRUD for makeup packages.
 */
const Service = require('../models/Service');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @desc    List all services
 * @route   GET /api/services
 * @access  Public
 */
const getServices = asyncHandler(async (req, res) => {
  // ?activeOnly=true returns only the packages visible on the website
  const filter = req.query.activeOnly === 'true' ? { isActive: true } : {};

  const services = await Service.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

/**
 * @desc    Get one service
 * @route   GET /api/services/:id
 * @access  Public
 */
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.status(200).json({ success: true, data: service });
});

/**
 * @desc    Create a service
 * @route   POST /api/services
 * @access  Private (admin)
 */
const createService = asyncHandler(async (req, res) => {
  const { title, price, description, imageUrl, isActive } = req.body;

  const service = await Service.create({ title, price, description, imageUrl, isActive });

  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  });
});

/**
 * @desc    Update a service
 * @route   PUT /api/services/:id
 * @access  Private (admin)
 */
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  const allowed = ['title', 'price', 'description', 'imageUrl', 'isActive'];
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) service[field] = req.body[field];
  });

  const updated = await service.save();

  res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: updated,
  });
});

/**
 * @desc    Delete a service
 * @route   DELETE /api/services/:id
 * @access  Private (admin)
 */
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
