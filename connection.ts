import { Pool} from "pg";
import dotenv from 'dotenv'

dotenv.config()

export let db = new Pool();

// if (process.env.RDS_HOSTNAME || process.env.DATABASE_URL) {
// 	console.log(`Running Production Databse......`)
// 	db = new Pool({
// 		host: process.env.RDS_HOSTNAME,
// 		port: 5432,
// 		database: process.env.RDS_DB_NAME,
// 		user: process.env.RDS_USERNAME,
// 		password: process.env.RDS_PASSWORD
// 	}) 
// } else {
// 	console.log(`Running Development Databse......`)
// 	db = new Pool({
// 	  user: "hope",
// 	  host: "localhost",
// 	  database: "ballroom",
// 	  password: "12345678kds",
// 	  port: 5432
// 	});
// }



 // provision a new db and set publicly accessible to No.. 