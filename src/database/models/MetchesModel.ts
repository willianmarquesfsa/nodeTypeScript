import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Metches extends Model {
  public id: number;
  public homeTeam: number;
  public awayTeam: number;
  public homeTeamGoals: number;
  public awayTeamGoals: number;
  public inProgress!: boolean;
}

Metches.init({
  // ... Campos
  id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
  homeTeam: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Metches;
