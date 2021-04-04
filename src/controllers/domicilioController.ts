import { getRepository } from 'typeorm';
import { Domicilio } from '../entity/Domicilio';

export async function ObtenerTodosLosDomicilios() {
    try {
        
        const domicilios: Domicilio[] = await getRepository(Domicilio).find()
        return domicilios

    } catch (error) {
        console.log(error)
    }
}

export async function ObtenerDomiCliente(id: number) {
    try {
        
        const domiCliente = await getRepository(Domicilio).find({where: {idCliente: id}})
        return domiCliente

    } catch (error) {
        console.log(error)
    }
}

export async function ObtenerDomiProducto(id: number) {
    try {
        
        const domiProducto = await getRepository(Domicilio).find({where: {idProducto: id}})
        return domiProducto

    } catch (error) {
        console.log(error)
    }
}

export async function CrearDomicilio(data: any) {
    try {
        
        let domicilio =  getRepository(Domicilio).create({
            idProducto: data.idProducto,
            idCliente: data.idCliente,
            ciudad: data.ciudad,
            barrio: data.barrio,
            direccion: data.direccion
        })

        await getRepository(Domicilio).save(domicilio)

        return domicilio

    } catch (error) {
        console.log(error)
    }
}

export async function ActualizarDomicilio(id: number, data: any) {
    try {
        
        await getRepository(Domicilio).update({idDomicilio: id}, {
            idProducto: data.idProducto,
            idCliente: data.idCliente,
            ciudad: data.ciudad,
            barrio: data.barrio,
            direccion: data.direccion
        })

        return data

    } catch (error) {
        console.log(error)
    }
}

export async function EliminarDomicilio(id: number) {
    try {
        
        const domi: any = await getRepository(Domicilio).findOne({idDomicilio: id})
        await getRepository(Domicilio).remove(domi)
        return "domicilio: "+domi.idDomicilio+" eliminado"
        
    } catch (error) {
        console.log(error)
    }
}