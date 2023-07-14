import sequalize from "../db.js";
import { DataTypes } from "sequelize";


const User = sequalize.define("user", {
    id: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    order_id: {type: DataTypes.STRING, allowNull: true, unique: false},
    phone: {type: DataTypes.STRING, allowNull: true, unique: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const UserCopy = sequalize.define("userCopy", {
    id: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    order_id: {type: DataTypes.STRING, allowNull: true, unique: false},
    phone: {type: DataTypes.STRING, allowNull: true, unique: false},
    password: {type: DataTypes.STRING, allowNull: false}
})

const Admin = sequalize.define("admin", {
    id: {type: DataTypes.STRING, unique: true, allowNull: false, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false}
})

const Code = sequalize.define("code", {
    id: {type: DataTypes.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, unique: false, allowNull: false},
    expiresIn: {type: DataTypes.DATE, unique: false, allowNull: false}
})

export default {User, Admin, Code, UserCopy}