import jwt from 'jsonwebtoken';

async function createdToken(cuenta: any){
    return jwt.sign({
        id: cuenta.identificacion
    },"dominiJSEusuario", {
        expiresIn: 86400
    })
}

export default createdToken