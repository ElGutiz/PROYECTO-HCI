const { Router } = require('express');
const router = Router();

const { prueba, login, loginEmpresa, register, registerEmpresa } = require('../controllers/index.controller');

router.get('/prueba', prueba)
router.get('/login', login)
router.get('/loginEmpresa', loginEmpresa)

router.post('/user', register)
router.post('/company', registerEmpresa)

module.exports = router;