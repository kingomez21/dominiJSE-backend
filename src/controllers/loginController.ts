import { getRepository } from 'typeorm';
import { Usuario } from '../entity/Usuario';
import { Negocio } from '../entity/Negocio';
import {compararContrasenaLogin} from '../middlewares/password'
import createdToken from '../middlewares/tokenJwt';
import jwt from 'jsonwebtoken';

export async function loginUsuario(correo: string, contrasena: string){
    try {
        
        const usuario = await getRepository(Usuario).findOne({correo: correo})
        
        if(usuario){
            let verificacion: boolean = await compararContrasenaLogin(contrasena, usuario.contrasena)
            if(verificacion){
                return createdToken(usuario)
            }else{
                return "correo o contraseña no validos"
            }
        }else{
            return "usuario no encontrado"
        }


    } catch (error) {
        console.log(error)
    }
}

export async function loginNegocio(correo: string, contrasena: string){
    try {
        
        const negocio = await getRepository(Negocio).findOne({correo: correo})

        if(negocio){
            let verificacion: boolean = await compararContrasenaLogin(contrasena, negocio.contrasena)
            if(verificacion){
                return createdToken(negocio)
            }else{
                return "correo o contraseña no validos"
            }
        }else{
            return "negocio no encontrado"
        }


    } catch (error) {
        console.log(error)
    }
}

export async function session(context: any) {
    try {
        
        let token = context.headers.authorization
        if(token){
            const decode: any = jwt.verify(token, "dominiJSEusuario")
            const user = await  getRepository(Usuario).findOne({identificacion: decode.id})
            const negocio = await  getRepository(Negocio).findOne({identificacion: decode.id})
            
            if(user){
                return false
            }
            if(negocio){
                return true
            }

        }else {
            return "no hay nada"
        }

    } catch (error) {
        console.log(error)
    }
}

export async function InLogin(context: any) {
    try {
        
        let token = context.headers.authorization
        if(token){
            const decode: any = jwt.verify(token, "dominiJSEusuario")

            const user = await  getRepository(Usuario).findOne({identificacion: decode.id})
            const negocio = await  getRepository(Negocio).findOne({identificacion: decode.id})
            
            if(user){
                return user
            }
            if(negocio){
                return negocio
            }

        }else {
            return null
        }

    } catch (error) {
        console.log(error)
    }
}