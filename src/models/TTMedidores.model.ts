import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
  tableName: "TT_OPER_ULTIMOS_MED",
  timestamps: false,
})
class TTMedidores extends Model {
  @Column({
    type: DataType.CHAR(2),
    field: "COD",
  })
  cod!: string;

  @Column({
    type: DataType.STRING(20),
    field: "DESCRIP",
  })
  descrip!: string;

  @Column({
    type: DataType.DATE,
    field: "ANTHORA",
  })
  anthora!: Date;

  @Column({
    type: DataType.FLOAT,
    field: "ANTDATO",
  })
  antdato!: number;

  @Column({
    type: DataType.DATE,
    field: "ULTHORA",
  })
  ulthora!: Date;

  @Column({
    type: DataType.FLOAT,
    field: "ULTDATO",
  })
  ultdato!: number;
}

export default TTMedidores;
