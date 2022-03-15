import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

// Clubs.hasMany() aqui vai a associação do id

export default Users;
