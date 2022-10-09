import { db } from "../../connection";
import SQL from "sql-template-strings"



export async function createDeptTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    dept(
        department VARCHAR PRIMARY KEY NOT NULL
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}

export async function create_dept(dept:string) {
    let department = await db.query(SQL ` INSERT INTO dept(department)
        VALUES(${dept});`)
}

export async function get_departments() {
    const dept = db.query(SQL ` SELECT department from dept `)
    return dept
}