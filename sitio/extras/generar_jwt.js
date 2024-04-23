const jwt = require('jsonwebtoken');

const generarJWT = (payload) =>{
    return new Promise ((resolve, reject) =>{
    
        const token = jwt.sign(payload, 'privateKey', {
            expiresIn: '5m'
        });
        console.log(token)
        return token
    })
}

module.exports = generarJWT;