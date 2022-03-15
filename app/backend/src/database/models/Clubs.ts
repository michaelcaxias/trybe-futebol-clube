import { DataTypes, Model } from 'sequelize';
import db from '.';

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
  timestamps: false,
});

// Clubs.hasMany() aqui vai a associação do id

export default Clubs;
