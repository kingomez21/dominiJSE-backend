import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domicilio } from "./Domicilio";

@Index("idDomicilio", ["idDomicilio"], {})
@Entity("factura", { schema: "domijsedb" })
export class Factura {
  @PrimaryGeneratedColumn({ type: "int", name: "idFactura" })
  idFactura: number;

  @Column("int", { name: "idDomicilio" })
  idDomicilio: number;

  @Column("int", { name: "cantidad" })
  cantidad: number;

  @Column("double", { name: "totalPagar", nullable: true, precision: 22 })
  totalPagar: number | null;

  @Column("timestamp", {
    name: "fechaCreacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(() => Domicilio, (domicilio) => domicilio.facturas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "idDomicilio", referencedColumnName: "idDomicilio" }])
  idDomicilio2: Domicilio;
}
