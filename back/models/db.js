import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    'db_bitcoin',
    'root',
    'root',
    {
        dialect: 'postgres',
        host: 'postgres',
        port: 5432,
        omitNull: true,
    }
)
export default sequelize;