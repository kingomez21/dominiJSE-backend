import { gql } from 'apollo-server-express';


const typeDefs = gql`
    scalar Date

    type Query {
        listaUsuarios: [Usuario]
        Usuario(id: Int): Usuario
        listaNegocios: [Negocio]
        Negocio(id: Int, nombre: String): Negocio
        listaProductos: [Producto]
        listaDomicilios: [Domicilio]
        listaProductosEstado(estado: Boolean): [Producto]  
        listaFacturas: [Factura]
        listaPtoNegocio(idNegocio: String): [Producto]
        listaDomiCliente(id: Int): [Domicilio]
        listaDomiProducto(id: Int): [Domicilio]
        listaFacturaDomicilio(id: Int): [Factura]
        enLogin: inLogin
    }

    type Mutation {
        loginUsuario(input: inputLogin): String
        loginNegocio(input: inputLogin): String
        crearUsuario(input: inputUsuario): Usuario
        actualizarUsuario(id: Int, input: inputUsuario): Usuario
        eliminarUsuario(id: Int): String
        crearNegocio(input: inputNegocio): Negocio
        actualizarNegocio(codigo: String, input: inputNegocio): Negocio
        eliminarNegocio(codigo: String): String  
        crearProducto(input: inputProducto): Producto
        actualizarProducto(id: Int, input: inputProducto): Producto
        eliminarProducto(id: Int): String
        crearDomicilio(input: inputDomicilio): Domicilio
        actualizarDomicilio(id: Int, input: inputDomicilio): Domicilio
        eliminarDomicilio(id: Int): String
        crearFactura(input: inputFactura): Factura
        actualizarFactura(id: Int, input: inputFactura): Factura
        eliminarFactura(id: Int): String
    }

    type Usuario {
        identificacion: Int
        nombre: String
        apellido: String
        correo: String
        contrasena: String
        telefono: Int
        fechaCreacion: Date
    }

    type Negocio {
        codigoNegocio: String
        dueno: String
        identificacion: Int
        correo: String
        contrasena: String
        nombre: String
        tipoNegocio: String
        fechaCreacion: Date
    }

    type Producto {
        id: ID
        nombreProducto: String
        imagenUrl: String
        descripcionProducto: String
        precio: Int
        precioDomicilio: Int
        idNegocio: String
        estado: Boolean
        fechaCreacion: Date
    }

    type Domicilio {
        idDomicilio: ID
        idProducto: Int
        idCliente: Int
        ciudad: String
        barrio: String
        direccion: String
        fechaCreacion: Date
    }

    type Factura {
        idFactura: ID
        idDomicilio: Int
        cantidad: Int
        totalPagar: Int
        fechaCreacion: Date
    }

    input inputUsuario {
        identificacion: Int
        nombre: String
        apellido: String
        correo: String
        contrasena: String
        telefono: Int
    }

    input inputNegocio {
        codigoNegocio: String
        dueno: String
        identificacion: Int
        correo: String
        contrasena: String
        nombre: String
        tipoNegocio: String
    }

    input inputProducto {
        nombreProducto: String
        imagenUrl: String
        descripcionProducto: String
        precio: Int
        precioDomicilio: Int
        idNegocio: String
        estado: Boolean
    }

    input inputDomicilio {
        idProducto: Int
        idCliente: Int
        ciudad: String
        barrio: String
        direccion: String
    }

    input inputFactura {
        idDomicilio: Int
        cantidad: Int
        totalPagar: Int
    }

    input inputLogin{
        correo: String
        contrasena: String
    }

    type inLogin{
        identificacion: Int
        correo: String
        nombre: String
    }

`;

export default typeDefs