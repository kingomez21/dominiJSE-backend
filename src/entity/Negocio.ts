import { Column, Entity, Index, OneToMany } from "typeorm";
import { Producto } from "./Producto";

@Index("identificacion", ["identificacion"], { unique: true })
@Entity("negocio", { schema: "domijsedb" })
export class Negocio {
  @Column("varchar", { primary: true, name: "codigoNegocio", length: 255 })
  codigoNegocio: string;

  @Column("varchar", { name: "dueno", length: 100 })
  dueno: string;

  @Column("int", { name: "identificacion", unique: true })
  identificacion: number;

  @Column("varchar", { name: "correo", length: 100 })
  correo: string;

  @Column("varchar", { name: "contrasena", length: 50 })
  contrasena: string;

  @Column("varchar", { name: "nombre", length: 255 })
  nombre: string;

  @Column("varchar", { name: "tipoNegocio", length: 100 })
  tipoNegocio: string;

  @Column("timestamp", {
    name: "fechaCreacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Producto, (producto) => producto.idNegocio2)
  productos: Producto[];
}
