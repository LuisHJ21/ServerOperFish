import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "OPER_EQUIPOS_LISTA",
  timestamps: false,
})
class EquiposLista extends Model {
  @Column({
    primaryKey: true,
    type: DataType.CHAR(8),
    field: "COD_MAQ",
  })
  cod_maq!: string;

  @Column({
    type: DataType.STRING(25),
    field: "DENOM",
  })
  denom!: string;

  @Column({
    type: DataType.CHAR(1),
    field: "FLAG_ESTADO",
  })
  flag_estado!: string;

  @Column({
    type: DataType.NUMBER,
    field: "NUM_COMP",
  })
  num_comp!: string;

  @Column({
    type: DataType.NUMBER,
    field: "NUM_ORD",
  })
  num_ord!: string;

  @Column({
    type: DataType.STRING(20),
    field: "NOM_CORTO",
  })
  nom_corto!: string;

  @Column({
    type: DataType.NUMBER,
    field: "NUM_HOROM",
  })
  num_horom!: string;
}

export default EquiposLista;
