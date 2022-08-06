import { Pool} from "pg";


export async function dbConnection(){
  if (process.env.RDS_HOSTNAME) {
    console.log(`Running Production Database....`)
    const pg = new Pool({
      host: process.env.RDS_HOSTNAME,
      port: 5432,
      database: process.env.RDS_DB_NAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD
    })
    return pg

  }else{
    console.log(`Running Development Databse......`)
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

// provision a new db and set publicly accessible to No.. 