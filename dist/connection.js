"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const pg_1 = require("pg");
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        /// if (process.env.DATABASE_URL) {
        const pg = new pg_1.Pool({
            host: process.env.RDS_HOSTNAME,
            port: 5432,
            database: process.env.RDS_DB_NAME,
            user: process.env.RDS_USERNAME,
            password: process.env.RDS_PASSWORD,
        });
        return pg;
        //}else{
        //  const pg = new Pool({
        //    user: "hope",
        //    host: "localhost",
        //    database: "ballroom",
        //    password: "12345678kds",
        //    port: 5432
        //  });
        //  return pg
        //}  
    });
} //
exports.dbConnection = dbConnection;
//
//export async function dbConnection() {
//    return open({
//      filename: './data/ballroom.db',
//      driver: sqlite3.cached.Database
//    })
//  }
