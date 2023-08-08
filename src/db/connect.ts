import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URI || "", {
    dialect: "mysql",
    logging: false,
});

export default sequelize;
