import { Column, Entity, OneToMany } from "typeorm";
import { Domicilio } from "./Domicilio";

@Entity("usuario", { schema: "domijsedb" })
export class Usuario {
  @Column("int", { primary: true, name: "identificacion" })
  identificacion: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "correo", length: 255 })
  correo: string;

  @Column("varchar", { name: "contrasena", length: 100 })
  contrasena: string;

  @Column("int", { name: "telefono" })
  telefono: number;

  @Column("timestamp", {
    name: "fechaCreacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => Domicilio, (domicilio) => domicilio.idCliente2)
  domicilios: Domicilio[];
}
