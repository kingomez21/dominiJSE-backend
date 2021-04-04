import {getRepository} from 'typeorm'
import {Negocio} from '../entity/Negocio'
import { encriptar } from '../middlewares/password'

export async function ObtenerTodosLosNegocios() {
    try {
        
        const negocios: Negocio[] = await getRepository(Negocio).find()

        return negocios

    } catch (error) {
        console.log(error)
    }
}

export async function CrearNegocio(data: any) {
    try {
        let anio = new Date()
        let negocio = getRepository(Negocio).create({
            codigoNegocio: anio.getFullYear()+"neg"+data.codigoNegocio,
            dueno: data.dueno,
            identificacion: data.identificacion,
            correo: data.correo,
            contrasena: await encriptar(data.contrasena),
            nombre: data.nombre,
            tipoNegocio: data.tipoNegocio
        })

        await getRepository(Negocio).save(negocio)

        return data

    } catch (error) {
        console.log(error)
    }
}

export async function ActualizarNegocio(codigo: string, data: any) {
    try {
        
        await getRepository(Negocio).update({codigoNegocio: codigo}, {
            dueno: data.dueno,
            identificacion: data.identificacion,
            correo: data.correo,
            contrasena:  await encriptar(data.contrasena),
            nombre: data.nombre,
            tipoNegocio: data.tipoNegocio
        })

        return data

    } catch (error) {
        console.log(error)
    }
}

export async function EliminarNegocio(codigo: string) {
    try {
        
        let neg: any = await getRepository(Negocio).findOne({codigoNegocio: codigo})
        await getRepository(Negocio).remove(neg)

        return "negocio: "+neg.nombre+" eliminado"

    } catch (error) {
        console.log(error)
    }
}

export async function ObtenerNegocio(id: number, nombre: string) {
    try {
        
        const neg = await getRepository(Negocio).findOne({where: {identificacion: id, nombre: nombre}})
        return neg

    } catch (error) {
        console.log(error)
    }
}