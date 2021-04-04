import { getRepository } from 'typeorm';
import { Producto } from '../entity/Producto';

export async function ObtenerTodosLosProducto() {
    try {
        
        const productos: Producto[] = await getRepository(Producto).find()
        return productos

    } catch (error) {
        console.log(error)
    }
}

export async function ObetenerProdCodigoNegocio(idNegocio: string) {
    try {
        
        const prod = await getRepository(Producto).find({where: {idNegocio: idNegocio}})
        return prod

    } catch (error) {
        console.log(error)
    }
}

export async function crearProducto(data: any) {
    try {
        
        const producto = getRepository(Producto).create({
            nombreProducto: data.nombreProducto,
            imagenUrl: data.imagenUrl,
            descripcionProducto: data.descripcionProducto,
            precio: data.precio,
            precioDomicilio: data.precioDomicilio,
            idNegocio: data.idNegocio,
            estado: data.estado
        })

        await getRepository(Producto).save(producto)

        return data

    } catch (error) {
        console.log(error)   
    }   
}

export async function ActualizarProducto(id: number, data: any) {
    try {
        
        await getRepository(Producto).update({id: id}, {
            nombreProducto: data.nombreProducto,
            imagenUrl: data.imagenUrl,
            descripcionProducto: data.descripcionProducto,
            precio: data.precio,
            precioDomicilio: data.precioDomicilio,
            idNegocio: data.idNegocio,
            estado: data.estado
        })

        return data

    } catch (error) {
        console.log(error)
    }
}

export async function EliminarProducto(id: number) {
    try {
        
        let prod: any = await getRepository(Producto).findOne({id: id})
        await getRepository(Producto).remove(prod)

        return "producto: "+prod.nombreProducto+" eliminado"

    } catch (error) {
        console.log(error)
    }
}

export async function ObtenerProductosEstado(estado: boolean) {
    try {
        
        const prods = getRepository(Producto).find({where: {estado: estado}})
        return prods
        
    } catch (error) {
        console.log(error)
    }
}