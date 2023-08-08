import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connect";
class Contact extends Model {
    public id!: number;
    public phoneNumber?: string;
    public email?: string;
    public linkedId?: number;
    public linkPrecedence!: "primary" | "secondary";
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date;
}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        linkedId: DataTypes.INTEGER,
        linkPrecedence: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: "Contact",
    }
);
export default Contact;
