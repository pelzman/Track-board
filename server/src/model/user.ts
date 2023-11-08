import { Model, Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import connection from "../config/database";

export interface UserAttribute {
  id: string;
  userName: string;
  email: string;
  password: string;
}

class User extends Model<UserAttribute> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,

      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User", // Set the model name
    tableName: "users",
    timestamps: false,
  }
);

// Optionally, you can define associations and other configurations here

// Sync the model with the database

export default User; // Return the User model
