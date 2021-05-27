const { Router } = require('express');
const router = Router();

const { prueba, login } = require('../controllers/index.controller');

router.get('/prueba', prueba)
router.get('/login', login)

module.exports = router;