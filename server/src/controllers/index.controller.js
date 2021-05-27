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
                        message: 'Login successful.'
                    });
                }else{
                    res.json({
                        login: false,
                        message: 'Wrong password.'
                    });
                }
            }else{
                res.json({
                    login: false,
                    message: "The user doesn't exists."
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
                        message: 'Login successful.'
                    });
                }else{
                    res.json({
                        login: false,
                        message: 'Wrong password.'
                    });
                }
            }else{
                res.json({
                    login: false,
                    message: "The company doesn't exists."
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
                    message: 'Register successful.'
                });
            }else{
                res.json({
                    register: false,
                    message: "Register failed. Please check all the fields."
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
                    message: 'Register successful.'
                });
            }else{
                res.json({
                    register: false,
                    message: "Register failed. Please check all the fields."
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
    registerEmpresa
};
