import {getRepository} from 'typeorm'
import { Usuario } from '../entity/Usuario';
import { encriptar } from '../middlewares/password';

export async function ObtenerUsuarios(){
    try {
        
        const usuarios: any = await getRepository(Usuario).find()
        return usuarios

    } catch (error) {
        console.log(error)
    }
}

export async function CrearUsuario(data: any) {
    try {
        
        
        let usuario: any = getRepository(Usuario).create({
            identificacion: data.identificacion,
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            contrasena: await encriptar(data.contrasena),
            telefono: data.telefono
        })

        await getRepository(Usuario).save(usuario) 
        
        return data

    } catch (error) {
        console.log(error)
    }
}

export async function ActualizarUsuario(id: number, data: any) {
    try {
        
        await getRepository(Usuario).update({identificacion: id}, {
            nombre: data.nombre,
            apellido: data.apellido,
            correo: data.correo,
            contrasena:  await encriptar(data.contrasena),
            telefono: data.telefono
        })
        
        return data

    } catch (error) {
        console.log(error)
    }
}

export async function eliminarUsuario(id: number) {
    try {
        let usuarioEliminado: any = await getRepository(Usuario).findOne({identificacion: id})
        if(usuarioEliminado){
            await getRepository(Usuario).remove(usuarioEliminado)
            return "usuario: "+usuarioEliminado.nombre+" eliminado"
        }else{
            return "usuario no encontrado"
        }
        
        

    } catch (error) {
        console.log(error)
    }
    
}

export async function ObtenerUser(id: number) {
    try {
        
        const usuario = getRepository(Usuario).findOne({identificacion: id})
        return usuario

    } catch (error) {
        console.log(error)
    }
}