"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Tasks extends sequelize_1.Model {
}
Tasks.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        // Automatically generate UUID
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    day: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reminder: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: "tasks",
});
exports.default = Tasks;
