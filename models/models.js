import sequalize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequalize.define("user", {
    id: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: true, unique: true},
    password: {type: DataTypes.STRING, allowNull: true}
})

export default {User}