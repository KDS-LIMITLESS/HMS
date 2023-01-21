"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.INSTANCE_IP) {
    console.log(`Running Production Databse......`);
    exports.db = new pg_1.Pool({
        host: process.env.INSTANCE_IP,
        port: 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    });
}
else if (process.env.DATABASE_URL) {
    console.log(`running dbase database`);
    exports.db = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    console.log(`Running Development Databse......`);
    exports.db = new pg_1.Pool({
        user: "uppist",
        host: "localhost",
        database: "hms",
        port: 5432,
        password: "12345678kds"
    });
}
// provision a new db and set publicly accessible to No.. 
