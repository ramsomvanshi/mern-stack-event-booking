const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect, createEvent);

module.exports = router;
