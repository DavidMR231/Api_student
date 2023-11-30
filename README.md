# Aplicación de Gestión de Estudiantes con Node.js y PostgreSQL

Este es un ejemplo de una aplicación simple que utiliza Node.js y PostgreSQL para gestionar información de estudiantes. A continuación, se presenta el código comentado:

```javascript
// Importar las bibliotecas necesarias
const { Pool } = require("pg");
const express = require("express");
const app = express();

// Configurar la aplicación para usar JSON y cargar variables de entorno
app.use(express.json());
require('dotenv').config();
const API_KEY = process.env.API_KEY;

// Middleware para validar la clave de la API
const apiKeyValidation = (req, res, next) => {
  const userApiKey = req.get("x-api-key");
  if (userApiKey && userApiKey === API_KEY) {
    next();
  } else {
    res.status(401).send('Invalid API key');
  }
};
app.use(apiKeyValidation);

// Configurar el puerto de la aplicación
const port = process.env.PORT || 3000;

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: "default",
  host: "ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com",
  database: "verceldb",
  password: "bf3BTmnKYd4P",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

// Ruta de prueba para verificar el funcionamiento del servidor
app.get("/", (req, res) => {
  return res.send("Hello World");
});

// Ruta para obtener un estudiante por ID
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

// Ruta para obtener todos los estudiantes
app.get("/students", (req, res) => {
  const listUsersQuery = `SELECT * FROM students;`;

  pool.query(listUsersQuery).then((data) => {
    console.log("List students: ", data.rows);
    res.send(data.rows);
  }).catch((err) => {
    console.error(err);
  });
});

// Ruta para agregar un nuevo estudiante
app.post('/students', (req, res) => {
  const insertUsersQuery = `
    INSERT INTO students (id, name, lastname, notes) VALUES
    (${req.body.id}, '${req.body.name}', '${req.body.lastname}', '${req.body.notes}');
  `;

  pool.query(insertUsersQuery)
    .then((data) => {
      console.log("List students: ", data.rows);
      res.send('Student insert');
    })
    .catch((err) => {
      console.error(err);
    });
});

// Ruta para actualizar un estudiante por ID
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

// Ruta para eliminar un estudiante por ID
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

// Ruta para obtener todos los estudiantes (nueva implementación)
app.delete("/students", (req, res) => {
  const ListUsersQueryDelete = "SELECT * FROM students;";

  pool.query(ListUsersQueryDelete)
    .then((data) => {
      console.log("List students: ", data.rows);
      res.send(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

