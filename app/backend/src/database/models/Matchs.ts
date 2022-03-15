import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  id: number;
  homeTeam: string;
  homeTeamGoals: string;
  awayTeam: string;
  awayTeamGoals: string;
  inProgress: string;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.STRING,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.STRING,
  inProgress: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});


export default Matchs;
