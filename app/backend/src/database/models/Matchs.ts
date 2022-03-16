import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: number;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.INTEGER,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'id', as: 'home_team' });
Matchs.belongsTo(Clubs, { foreignKey: 'id', as: 'away_team' });

export default Matchs;
