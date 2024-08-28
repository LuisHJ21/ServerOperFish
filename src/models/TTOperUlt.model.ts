import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "TT_OPER_ULTIMOS",
  timestamps: false,
})
class TTOperUlt extends Model {
  @Column({
    type: DataType.DATE,
    field: "HORA",
  })
  hora!: Date;

  @Column({
    type: DataType.STRING(3),
    field: "MAQUINA",
  })
  maquina!: string;

  @Column({
    type: DataType.CHAR(2),
    field: "COMPRESOR",
  })
  compresor: string;

  @Column({
    type: DataType.NUMBER,
    field: "PRESA",
  })
  presa!: number;

  @Column({
    type: DataType.NUMBER,
    field: "PRESB",
  })
  presb!: number;

  @Column({
    type: DataType.NUMBER,
    field: "PRESAC",
  })
  presac!: number;

  @Column({
    type: DataType.NUMBER,
    field: "AMPER",
  })
  amper!: number;

  @Column({
    type: DataType.STRING(3),
    field: "NIVELA",
  })
  nivela!: string;

  @Column({
    type: DataType.NUMBER,
    field: "TEMPA",
  })
  tempa!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMPA1",
  })
  tempa1!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMPM",
  })
  tempm!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMPM1",
  })
  tempm1!: number;

  @Column({
    type: DataType.DATE,
    field: "HORALRG",
  })
  horalrg!: Date;
}

export default TTOperUlt;
