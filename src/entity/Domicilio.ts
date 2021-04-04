import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Producto } from "./Producto";
import { Factura } from "./Factura";

@Index("idProducto", ["idProducto"], {})
@Index("idCliente", ["idCliente"], {})
@Entity("domicilio", { schema: "domijsedb" })
export class Domicilio {
  @PrimaryGeneratedColumn({ type: "int", name: "idDomicilio" })
  idDomicilio: number;

  @Column("int", { name: "idProducto" })
  idProducto: number;

  @Column("int", { name: "idCliente" })
  idCliente: number;

  @Column("varchar", { name: "ciudad", length: 100 })
  ciudad: string;

  @Column("varchar", { name: "barrio", length: 100 })
  barrio: string;

  @Column("varchar", { name: "direccion", length: 100 })
  direccion: string;

  @Column("timestamp", {
    name: "fechaCreacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.domicilios, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idCliente", referencedColumnName: "identificacion" }])
  idCliente2: Usuario;

  @ManyToOne(() => Producto, (producto) => producto.domicilios, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idProducto", referencedColumnName: "id" }])
  idProducto2: Producto;

  @OneToMany(() => Factura, (factura) => factura.idDomicilio2)
  facturas: Factura[];
}
