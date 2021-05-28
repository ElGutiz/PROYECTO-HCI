const { Router } = require('express');
const router = Router();

const { prueba, login, loginEmpresa, register, registerEmpresa, matchCandidatos, contratar, crearVacante, agregarRequisitos, matchVacantes, getUser, getVacante, getEmpresa, addTags } = require('../controllers/index.controller');

router.get('/prueba', prueba)
router.get('/login', login)
router.get('/loginEmpresa', loginEmpresa)
router.get('/matchusers/:nombre', matchCandidatos)
router.get('/matchvacantes/:usuario', matchVacantes)
router.get('/usuario/:usuario', getUser)
router.get('/vacante/:id', getVacante)
router.get('/empresa/:nombre', getEmpresa)

router.post('/usuario', register)
router.post('/empresa', registerEmpresa)
router.post('/match', contratar)
router.post('/vacante', crearVacante)
router.post('/requisitos', agregarRequisitos)
router.post('/tag', addTags)

module.exports = router;