const express = require('express');
const { createProfile, getProfile } = require('../controllers/profileController');
const router = express.Router();

// Route to create a profile
router.post('/create', createProfile);

// Route to get the profile of the logged-in session
router.get('/view', getProfile);

module.exports = router;
