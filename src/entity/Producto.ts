import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domicilio } from "./Domicilio";
import { Negocio } from "./Negocio";

@Index("idNegocio", ["idNegocio"], {})
@Entity("producto", { schema: "domijsedb" })
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombreProducto", length: 100 })
  nombreProducto: string;

  @Column("varchar", { name: "imagenUrl", length: 255 })
  imagenUrl: string;

  @Column("text", { name: "descripcionProducto" })
  descripcionProducto: string;

  @Column("double", { name: "precio", precision: 22 })
  precio: number;

  @Column("double", { name: "precioDomicilio", precision: 22 })
  precioDomicilio: number;

  @Column("varchar", { name: "idNegocio", length: 255 })
  idNegocio: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @Column("timestamp", {
    name: "fechaCreacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Domicilio, (domicilio) => domicilio.idProducto2)
  domicilios: Domicilio[];

  @ManyToOne(() => Negocio, (negocio) => negocio.productos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idNegocio", referencedColumnName: "codigoNegocio" }])
  idNegocio2: Negocio;
}
