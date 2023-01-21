import { Pool} from "pg";
import dotenv from 'dotenv'

dotenv.config()

export let db: Pool;

if (process.env.INSTANCE_IP ) {
	console.log(`Running Production Databse......`)
	db = new Pool({
		host: process.env.INSTANCE_IP,
		port: 5432,
		database: process.env.DB_NAME,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	}) 
}
else if (process.env.DATABASE_URL) {
	console.log(`running dbase database`)
	db = new Pool({
	  connectionString: process.env.DATABASE_URL,
	  ssl: {
		rejectUnauthorized: false
	  }
	})
} 
else {
	console.log(`Running Development Databse......`)
	db = new Pool({
	  user: "uppist",
	  host: "localhost",
	  database: "hms",
	  port: 5432,
	  password: "12345678kds"
	});
}



 // provision a new db and set publicly accessible to No.. 