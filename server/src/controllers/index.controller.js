const neo4j = require('neo4j-driver');
require('dotenv').config()

const driver = neo4j.driver(
    process.env.BOLT_URL,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD), 
    {/* encrypted: 'ENCRYPTION_OFF' */}
);
const session = driver.session({database:process.env.NEO4J_DB});

const prueba = async (req, res) => {
    const query = "MATCH (n) RETURN (n) AS node LIMIT 5";
    session.run(query, {})
        .then((result) => {
            response = result.records.map((record) => {
                return record.get('node');
            });
            res.json({
                count: response.length,
                nodes: response
            });
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// LOGIN
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const login = async (req, res) => {
    const { usuario, contrasena } = req.headers;
    const query = "MATCH (u:usuarios) WHERE u.usuario=$usuario RETURN u AS node";
    session.run(query, { usuario })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                if(node.properties.contrasena === contrasena){
                    res.json({
                        nodes: node,
                        login: true,
                        message: 'Login correcto.'
                    });
                }else{
                    res.json({
                        login: false,
                        message: 'Contraseña incorrecta.'
                    });
                }
            }else{
                res.json({
                    login: false,
                    message: "El usuario no existe."
                });
            }
        })
        .catch((error) => console.log(error));
}

const loginEmpresa = async (req, res) => {
    const { nombre, contrasena } = req.headers;
    const query = "MATCH (e:empresas) WHERE e.nombre=$nombre RETURN e AS node";
    session.run(query, { nombre })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                if(node.properties.contrasena === contrasena){
                    res.json({
                        nodes: node,
                        login: true,
                        message: 'Login correcto.'
                    });
                }else{
                    res.json({
                        login: false,
                        message: 'Contraseña incorrecta.'
                    });
                }
            }else{
                res.json({
                    login: false,
                    message: "La empresa no está registrada."
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// REGISTER
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const register = async (req, res) => {
    const { cv, portafolio, foto, correo, bio, contrasena, usuario, telefono } = req.body;
    const query = "CREATE (u:usuarios {cv:$cv, portafolio:$portafolio, foto:$foto, correo:$correo, bio:$bio, contrasena:$contrasena, usuario:$usuario, telefono:$telefono}) RETURN u AS node";
    session.run(query, { cv, portafolio, foto, correo, bio, contrasena, usuario, telefono })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    nodes: node,
                    register: true,
                    message: 'Registro correcto.'
                });
            }else{
                res.json({
                    register: false,
                    message: "El registro falló. Por favor, revise los campos."
                });
            }
        })
        .catch((error) => console.log(error));
}

const registerEmpresa = async (req, res) => {
    const { bio, contrasena, foto, nombre, correo } = req.body;
    const query = "CREATE (e:empresas {foto:$foto, correo:$correo, bio:$bio, contrasena:$contrasena, nombre:$nombre}) RETURN e AS node";
    session.run(query, { bio, contrasena, foto, nombre, correo })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    nodes: node,
                    register: true,
                    message: 'Registro correcto.'
                });
            }else{
                res.json({
                    register: false,
                    message: "El registro falló. Por favor, revise los campos."
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MATCH CANDIDATOS PARA EMPRESAS
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const matchCandidatos = async (req, res) => {
    const query = "MATCH (e:empresas)-[r:tiene]->(v:vacantes)-[r2:requiere]->(t:tags)-[r3:sabe]->(u:usuarios) WHERE e.nombre=$nombre AND NOT (e)-[:contrato]->(u) RETURN u AS node, COUNT(r3) AS n ORDER BY COUNT(r3) DESC";
    session.run(query, { nombre: req.params.nombre })
        .then((result) => {
            response = result.records;
            if(response.length > 0){
                res.json({
                    n: response.length,
                    nodes: response.map((node)=>{
                        return {
                            n: node.get('n').low,
                            node: node.get('node')
                        };
                    })
                });
            }else{
                res.json({
                    n: 0
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CONTRATAR
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const contratar = async (req, res) => {
    const { empresa, usuario } = req.body;
    const query = "MATCH (e:empresas), (u:usuarios) WHERE e.nombre=$empresa AND u.usuario=$usuario AND NOT (e)-[:contrato]->(u) CREATE (e)-[r:contrato]->(u) RETURN u AS node";
    session.run(query, { empresa, usuario })
        .then((result) => {
            if(result.records.length > 0){
                res.json({
                    match: true,
                    message: 'Match correcto.'
                });
            }else{
                res.json({
                    match: false,
                    message: 'Ya has hecho match con este usuario anteriormente.'
                });
            }
        })
        .catch((error) => {
            res.json({
                match: false,
                message: 'Error al conectar con la base. Por favor intente luego.'
            });
        });
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CREAR VACANTE
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const crearVacante = async (req, res) => {
    const { nombre, detalles, deadline, empresa } = req.body;
    const query = "MATCH (e:empresas) WHERE e.nombre=$empresa CREATE (v:vacantes {nombre:$nombre, detalles:$detalles, deadline:$deadline}) CREATE (e)-[r:tiene]->(v) RETURN v AS node ";
    session.run(query, { nombre, detalles, deadline, empresa })
        .then((result) => {
            if(result.records.length > 0){
                res.json({
                    node: result.records[0].get('node')
                });
            }else{
                res.json({
                    node: null,
                    message: 'Por favor revisa que todos los campos sean correctos.'
                });
            }
        })
        .catch((error) => {
            res.json({
                node: null,
                message: "No se pudo conectar con la base de datos."
            });
        });
}

const agregarRequisitos = async (req, res) => {
    const { vacante, tag } = req.body;
    const query = "MATCH (v:vacantes), (t:tags) WHERE v.nombre=$vacante AND t.nombre=$tag AND NOT (v)-[:requiere]->(t) CREATE (v)-[r:requiere]->(t) RETURN r AS relation";
    session.run(query, { vacante, tag })
        .then((result) => {
            if(result.records.length === 1){
                res.json({
                    requisitos: true,
                    node: result.records[0].get('relation')
                });
            }else{
                res.json({
                    requisitos: false,
                    message: 'Ya se ha agregado este requisito anteriormente.'
                });
            }
        })
        .catch((error) => {
            res.json({
                requisitos: false,
                message: "No se pudo conectar con la base de datos."
            });
        });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MATCH VACANTES PARA USUARIOS
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const matchVacantes = async (req, res) => {
    const query = "MATCH (e:empresas)-[r:tiene]->(v:vacantes)-[r2:requiere]->(t:tags)-[r3:sabe]->(u:usuarios) WHERE u.usuario=$usuario AND NOT (e)-[:contrato]->(u) RETURN (e)--(v) AS node, COUNT(r3) AS n ORDER BY n DESC";
    session.run(query, { usuario: req.params.usuario })
        .then((result) => {
            response = result.records;
            if(response.length > 0){
                res.json({
                    n: response.length,
                    nodes: response.map((node)=>{
                        return {
                            n: node.get('n').low,
                            node: node.get('node')
                        };
                    })
                });
            }else{
                res.json({
                    n: 0
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GET USER BY USERNAME
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getUser = async (req, res) => {
    const query = "MATCH (u:usuarios) WHERE u.usuario=$usuario RETURN u AS node";
    session.run(query, { usuario: req.params.usuario })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    node: node,
                    user: true
                });
            }else{
                res.json({
                    user: false,
                    message: "No se pudo encontrar al usuario."
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GET VACANTES BY ID
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getVacante = async (req, res) => {
    const query = "MATCH (v:vacantes) WHERE ID(v)=$id RETURN v AS node";
    session.run(query, { id: parseInt(req.params.id) })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    node: node,
                    vacante: true
                });
            }else{
                res.json({
                    vacante: false,
                    message: "No se pudo encontrar la vacante."
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GET EMPRESA BY NOMBRE
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getEmpresa = async (req, res) => {
    const query = "MATCH (e:empresas) WHERE e.nombre=$nombre RETURN e AS node";
    session.run(query, { nombre: req.params.nombre })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    node: node,
                    empresa: true
                });
            }else{
                res.json({
                    empresa: false,
                    message: "No se pudo encontrar la empresa."
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// AGERGAR TAGS A USUARIO
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const addTags = async (req, res) => {
    const { usuario, tag } = req.body;
    const query = "MATCH (u:usuarios), (t:tags) WHERE u.usuario=$usuario AND t.nombre=$tag AND NOT (t)-[:sabe]->(u) CREATE (t)-[r:sabe]->(u) RETURN (t)-[r]->(u) AS node";
    session.run(query, { usuario, tag })
        .then((result) => {
            response = result.records;
            if(response.length === 1){
                node = response[0].get('node');
                res.json({
                    node: node,
                    tag: true
                });
            }else{
                res.json({
                    tag: false,
                    message: "No se pudo agregar la tag "+tag+'.'
                });
            }
        })
        .catch((error) => console.log(error));
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EXPORT MODULE
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
    prueba,
    login, 
    loginEmpresa, 
    register, 
    registerEmpresa, 
    matchCandidatos,
    contratar,
    crearVacante,
    agregarRequisitos,
    matchVacantes,
    getUser,
    getVacante,
    getEmpresa, 
    addTags
};
