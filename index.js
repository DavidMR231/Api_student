const { Pool } = require("pg");
const express = require("express");
const app = express();
app.use(express.json());
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const apiKeyValidation = (req, res, next) => {
  const userApiKey = req.get("x-api-key");
  if (userApiKey && userApiKey === API_KEY) {
    next();
  }else {
    res.status(401).send('Invalid API key');
  }
};
app.use(apiKeyValidation);	
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: "default",
  host: "ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com",
  database: "verceldb",
  password: "bf3BTmnKYd4P",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});
app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.get("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const query = `SELECT * FROM students WHERE id = $1;`; 

    pool.query(query, [studentId]) 
        .then((data) => {
            if (data.rows.length === 0) {
                res.status(404).send("Estudiante no encontrado"); 
            } else {
                console.log("List students: ", data.rows);
                res.send(data.rows);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error en el servidor");
        });
});

app.get("/students", (req, res) => {
  const listUsersQuery = `SELECT * FROM students;`;

  pool.query(listUsersQuery).then((data) => {
      console.log("List students: ", data.rows);
      res.send(data.rows); // Enviar los resultados de la consulta, no la consulta en sí
      // pool.end(); // Considera cerrar la conexión aquí si es necesario
    }).catch((err) => {
      console.error(err);
      // pool.end(); // Considera cerrar la conexión aquí si es necesario
    });
});
app.post('/students', (req, res) => {
  const insertUsersQuery = `
  INSERT INTO students (id, name, lastname, notes) VALUES
  (${req.body.id}, '${req.body.name}', '${req.body.lastname}', '${req.body.notes}');
  `;

  pool.query(insertUsersQuery)
  .then((data) => {
    console.log("List students: ", data.rows);
    res.send('Student insert');  // Mueve esta línea aquí si deseas enviar un mensaje específico
   // pool.end();
  })
  .catch((err) => {
    console.error(err);
    //pool.end();
  });
  // return res.send('Student insert'); // Elimina esta línea
});

app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, lastname, notes } = req.body;

    const updateStudentQuery = `
        UPDATE students
        SET name = '${name}', lastname = '${lastname}', notes ='${notes}'
        WHERE id = ${studentId};
    `;
    
    pool.query(updateStudentQuery)
        .then((data) => {
            console.log(`Student with ID ${studentId} updated successfully.`);
            res.send(`Student with ID ${studentId} updated successfully.`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating student.');
        });
});
app.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const query = `DELETE FROM students WHERE id = $1;`; 

    pool.query(query, [studentId]) 
        .then((data) => {
            if (data.rowCount === 0) {
                res.status(404).send("Estudiante no encontrado"); 
            } else {
                console.log(`Estudiante con ID ${studentId} eliminado exitosamente`);
                res.send(`Estudiante con ID ${studentId} eliminado exitosamente`);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error en el servidor");
        });
});
app.delete("/students", (req, res) => {
    const ListUsersQueryDelete = "SELECT * FROM students;";
  
    pool.query(ListUsersQueryDelete)
      .then((data) => {
        console.log("List students: ", data.rows);
        res.send(data.rows);
       // pool.end();
      })
      .catch((err) => {
        console.error(err);
        //pool.end();
      });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});