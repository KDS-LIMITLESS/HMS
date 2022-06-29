import sqlite3 from "sqlite3";
import { open } from 'sqlite';
import { Pool} from "pg";


export async function dbConnection(){
  const pg = new Pool({
    user: "hope",
    host: "localhost",
    database: "ballroom",
    password: "12345678kds",
    port: 5432
  });
  return pg
}

//export async function dbConnection() {
//    return open({
//      filename: './data/ballroom.db',
//      driver: sqlite3.cached.Database
//    })
//  }

