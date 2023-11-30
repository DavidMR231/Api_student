# Student Management API

Este proyecto consiste en un backend simple para gestionar estudiantes. Utiliza Node.js con Express para la creación del servidor y PostgreSQL como base de datos para almacenar información sobre los estudiantes.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalado Node.js y PostgreSQL en tu sistema.

## Configuración del Proyecto
1. Clona este repositorio en tu máquina local.
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias del proyecto.
   ```bash
   npm install
   ```

3. Crea una base de datos en PostgreSQL y actualiza la configuración en el archivo `index.js` con la información de tu base de datos.
   ```javascript
   const pool = new Pool({
     user: "TU_USUARIO",
     host: "TU_HOST",
     database: "TU_DATABASE",
     password: "TU_CONTRASEÑA",
     port: TU_PUERTO,
     ssl: { rejectUnauthorized: false },
   });
   ```

4. Define una clave de API en el archivo `index.js`.
   ```javascript
   const API_KEY = "TU_CLAVE_API";
   ```

## Ejecución del Servidor
Una vez que hayas configurado el proyecto, puedes ejecutar el servidor con el siguiente comando:
   ```bash
   npm start
   ```
El servidor se ejecutará en el puerto especificado en la variable de entorno `PORT` o en un puerto predeterminado si no está definido.

## Endpoints Disponibles
- `GET /students/:id`: Obtiene información sobre un estudiante específico mediante su ID.
- `GET /students`: Obtiene todos los estudiantes almacenados en la base de datos.
- `POST /students`: Agrega un nuevo estudiante a la base de datos. Se espera un cuerpo de solicitud JSON con los campos `id`, `name`, `lastname`, y `notes`.
- `PUT /students/:id`: Actualiza la información de un estudiante existente mediante su ID. Se espera un cuerpo de solicitud JSON con los campos a actualizar.
- `DELETE /students/:id`: Elimina un estudiante de la base de datos mediante su ID.
- `DELETE /students`: Obtiene todos los estudiantes almacenados en la base de datos (usado para mostrar el listado, no tiene efecto real).

## Middleware
El proyecto utiliza middleware para validar la clave de API en cada solicitud. Asegúrate de incluir la clave de API en la solicitud mediante el encabezado `x-api-key`.

## Manejo de Errores
Se ha implementado un middleware de manejo de errores centralizado que captura y registra los errores. Si ocurre un error durante el procesamiento de una solicitud, se enviará una respuesta de estado 500 con el mensaje "Error en el servidor".

## Cierre del Servidor
El servidor maneja eventos de cierre para asegurarse de cerrar adecuadamente la conexión con la base de datos al salir.
