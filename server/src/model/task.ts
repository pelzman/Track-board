import { Model, DataType, Sequelize, DataTypes } from "sequelize";
import User from "../model/user";
import connection from "../config/database";

export interface TaskAttributes {
  id?: string;
  userId?: string;
  text?: string;
  day?: string;
  reminder?: boolean;
}

class Tasks extends Model<TaskAttributes> {}

Tasks.init(
  {
    id: {
      type: DataTypes.UUID,
      // Automatically generate UUID
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "tasks",
  }
);
export default Tasks;
