const { Pool } = require('pg');




const listUsersQuery = `SELECT * FROM students;`;

pool.query(listUsersQuery)
    .then(res => {
        console.log("List students: ", res.rows);
        pool.end();
    })
    .catch(err => {
        console.error(err);
        pool.end();
    });