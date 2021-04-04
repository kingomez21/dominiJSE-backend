import { getRepository } from 'typeorm';
import { Factura } from '../entity/Factura';

export async function ObtenerTodasLasFacturas(){
    try {
        
        const facturas: any = getRepository(Factura).find()
        return facturas

    } catch (error) {
        console.log(error)
    }
}

export async function FacturaPorDomicilio(id: number) {
    try {
        
        const factDomi = await getRepository(Factura).find({where: {idDomicilio: id}})
        return factDomi

    } catch (error) {
        console.log(error)
    }
    
}

export async function CrearFactura(data: any) {
    try {
        
        let factura = getRepository(Factura).create({
            idDomicilio: data.idDomicilio,
            cantidad: data.cantidad,
            totalPagar: data.totalPagar
        })
        await getRepository(Factura).save(factura)
        return data

    } catch (error) {
        console.log(error)
    }
}

export async function ActualizarFactura(id: number, data: any) {
    try {
        
        await getRepository(Factura).update({idFactura: id}, {
            idDomicilio: data.idDomicilio,
            cantidad: data.cantidad,
            totalPagar: data.totalPagar
        })
        return data

    } catch (error) {
        console.log(error)
    }
}

export async function EliminarFactura(id: number) {
    try {
        
        const factura: any = await getRepository(Factura).findOne({idFactura: id})
        await getRepository(Factura).remove(factura)
        return "Factura: "+factura.idFactura+" eliminada"
        
    } catch (error) {
        console.log(error)
    }
}