const express = require('express');
const { addGrant, deleteGrant, getGrants, getExpiredGrants } = require('../controllers/grantController');
const router = express.Router();

// Routes
router.post('/addgrants', addGrant); // Add grant (only for alumni)
router.delete('/grants/:id', deleteGrant); // Delete grant (only for alumni)
router.get('/getgrants', getGrants); // Get all grants (students view)
module.exports = router;
