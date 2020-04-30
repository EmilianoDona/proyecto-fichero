const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }

    // validar el token

    try {
        // console.log(process.env.SECRETA)

        // const tokenn = jwt.sign({
        //     usuario: {
        //         id: '5ea5c73d4058c93f1cf5353b'
        //     }
        // }, process.env.SECRETA, {
        //     expiresIn: 3600 //1 hora
        // })
        
        const cifrado = jwt.verify(token, process.env.SECRETA);
        console.log(cifrado)

        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        console.log(error)

        res.status(401).json({msg: 'Token no válido'});
    }
}