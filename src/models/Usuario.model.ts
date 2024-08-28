import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "USUARIO",
  timestamps: false,
})
class Usuario extends Model {
  @Column({
    primaryKey: true,
    type: DataType.CHAR(6),
    field: "COD_USR",
  })
  cod_usr!: string;

  @Column({
    type: DataType.STRING(60),
    field: "NOMBRE",
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(3000),
    field: "CLAVE",
  })
  clave!: string;
  @Column({
    type: DataType.CHAR(8),
    field: "PERFIL",
  })
  perfil!: string;

  @Column({
    type: DataType.STRING(40),
    field: "EMAIL",
  })
  email!: string;

  @Column({
    type: DataType.CHAR(1),
    field: "FLAG_ESTADO",
  })
  flag_estado!: string;

  @Column({
    type: DataType.CHAR(2),
    field: "ORIGEN_ALT",
  })
  origen_alt!: string;

  @Column({
    type: DataType.CHAR(1),
    field: "FLAG_ORIGEN",
  })
  flag_origen!: string;

  @Column({
    type: DataType.INTEGER,
    field: "TIMEOUT",
  })
  timeout!: "number";

  @Column({
    type: DataType.INTEGER,
    field: "NIVEL_LOG_OBJETO",
  })
  nivel_log_objeto!: "number";

  @Column({
    type: DataType.CHAR(1),
    field: "FLAG_REPLICACION",
  })
  flag_replicacion!: string;

  @Column({
    type: DataType.STRING(15),
    field: "TELEMOBIL",
  })
  telemobil!: string;

  @Column({
    type: DataType.CHAR(1),
    field: "FLAG_TELEMOBIL",
  })
  flag_telemobil!: string;

  @Column({
    type: DataType.DATE,
    field: "FECHA_UCC",
  })
  fecha_ucc!: string;

  @Column({
    type: DataType.STRING(3),
    field: "COD_PRECIO",
  })
  cod_precio!: string;
}

export default Usuario;
