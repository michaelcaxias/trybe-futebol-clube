import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  id: number;

  clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  tableName: 'clubs',
  timestamps: false,
});

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'home_team' });
Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'away_team' });

Matchs.belongsTo(Clubs, { foreignKey: 'id', as: 'home_team' });
Matchs.belongsTo(Clubs, { foreignKey: 'id', as: 'away_team' });

export default Clubs;
