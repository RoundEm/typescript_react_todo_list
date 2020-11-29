const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool

// create table TODO(
// 	id serial primary key,
//     description text not null,
//     completed boolean not null default false,
//     dueDate date,
// );