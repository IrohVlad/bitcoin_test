import sequelize from './db.js';
import {DataTypes} from 'sequelize';
const History = sequelize.define('users', {
    date: {type: DataTypes.DATE, allowNull: false},
    close: {type: DataTypes.DOUBLE, allowNull: false}
})

export {History};