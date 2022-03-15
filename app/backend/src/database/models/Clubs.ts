import { DataTypes, Model } from 'sequelize';
import db from '.';

class Clubs extends Model {
  // public <campo>!: <tipo>;
}

Clubs.init({
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Clubs;
