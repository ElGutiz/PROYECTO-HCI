const { Router } = require('express');
const router = Router();

const { prueba } = require('../controllers/index.controller');

router.get('/prueba', prueba)

module.exports = router;