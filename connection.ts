import sqlite3 from "sqlite3";
import { open } from 'sqlite';
import { Pool} from "pg";



export async function dbConnection(){
  if (process.env.DATABASE_URL) {
    const pg = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
    return pg

  }else{
    const pg = new Pool({
      user: "hope",
      host: "localhost",
      database: "ballroom",
      password: "12345678kds",
      port: 5432
    });
    return pg
  }  
}

//export async function dbConnection() {
//    return open({
//      filename: './data/ballroom.db',
//      driver: sqlite3.cached.Database
//    })
//  }

