import { GraphQLScalarType, Kind } from 'graphql';
import { ActualizarDomicilio, CrearDomicilio, EliminarDomicilio, ObtenerDomiCliente, ObtenerDomiProducto, ObtenerTodosLosDomicilios } from '../controllers/domicilioController';
import { ActualizarFactura, CrearFactura, EliminarFactura, FacturaPorDomicilio } from '../controllers/facturaController';
import { InLogin, loginNegocio, loginUsuario, session } from '../controllers/loginController';
import { ActualizarNegocio, CrearNegocio, EliminarNegocio, ObtenerNegocio, ObtenerTodosLosNegocios } from '../controllers/negocioController';
import { ActualizarProducto, crearProducto, EliminarProducto, ObetenerProdCodigoNegocio, ObtenerProductosEstado, ObtenerTodosLosProducto } from '../controllers/productoController';
import { ObtenerUsuarios, CrearUsuario, ActualizarUsuario, eliminarUsuario, ObtenerUser } from '../controllers/usuarioControlller'

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        }
        return null;
    },
})

const resolvers = {
    Query: {
        listaUsuarios: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return ObtenerUsuarios()
            }
            return null
        },
        listaNegocios: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return ObtenerTodosLosNegocios()
            }
            return null
        },
        listaProductos: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return ObtenerTodosLosProducto()
            }
            return null
        },
        listaPtoNegocio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return ObetenerProdCodigoNegocio(args.idNegocio)
            }
            return null
        },
        listaDomicilios: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ObtenerTodosLosDomicilios()
            }
            return null
        },
        listaDomiCliente: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ObtenerDomiCliente(args.id)
            }
            return null
        },
        listaDomiProducto: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return ObtenerDomiProducto(args.id)
            }
            return null
        },
        listaFacturaDomicilio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return FacturaPorDomicilio(args.id)
            }
            return null
        },
        enLogin: async (parent: any, args: any, context: any, info: any) => {
           
            return InLogin(context.req)
        },
        listaProductosEstado: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ObtenerProductosEstado(args.estado)
            }
            return null
        },
        Usuario: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ObtenerUser(args.id)
            }
            return null
        },
        Negocio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return ObtenerNegocio(args.id, args.nombre)
            }
            return null
        },
    },

    Mutation: {
        crearUsuario: (parent: any, args: any, context: any, info: any) => {
            return CrearUsuario(args.input)
        },
        loginUsuario: (parent: any, args: any, context: any, info: any) => {
            return loginUsuario(args.input.correo, args.input.contrasena)
        },
        loginNegocio: (parent: any, args: any, context: any, info: any) => {
            return loginNegocio(args.input.correo, args.input.contrasena)
        },
        crearNegocio: (parent: any, args: any, context: any, info: any) => {
            return CrearNegocio(args.input)
        },
        actualizarUsuario: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return ActualizarUsuario(args.id, args.input)
            }
            return null
        },
        eliminarUsuario: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return eliminarUsuario(args.id)
            }
            return null
        },
        actualizarNegocio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return ActualizarNegocio(args.codigo, args.input)
            }
            return null
        },
        eliminarNegocio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false || bandera === true) {
                return EliminarNegocio(args.codigo)
            }
            return null
        },
        crearProducto: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return crearProducto(args.input)
            }
            return null
        },
        actualizarProducto: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return ActualizarProducto(args.id, args.input)
            }
            return null
        },
        eliminarProducto: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === true) {
                return EliminarProducto(args.id)
            }
            return null
        },
        crearDomicilio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return CrearDomicilio(args.input)
            }
            return null
        },

        actualizarDomicilio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ActualizarDomicilio(args.id, args.input)
            }
            return null
        },
        eliminarDomicilio: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return EliminarDomicilio(args.id)
            }
            return null
        },
        crearFactura: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return CrearFactura(args.input)
            }
            return null
        },
        actualizarFactura: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return ActualizarFactura(args.id, args.input)
            }
            return null
        },
        eliminarFactura: async (parent: any, args: any, context: any, info: any) => {
            const bandera: any = await session(context.req)
            if (bandera === false) {
                return EliminarFactura(args.id)
            }
            return null
        },
    }
}

export default resolvers