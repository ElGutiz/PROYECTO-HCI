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
                        nodes: response[0].get('node'),
                        login: true,
                        message: 'Login successful'
                    });
                }else{
                    res.json({
                        login: false,
                        message: 'Wrong password'
                    });
                }
            }else{
                res.json({
                    login: false,
                    message: "The user doesn't exists"
                });
            }
        })
        .catch((error) => console.log(error));
}

module.exports = {
    prueba,
    login
};
