# Comentarios sobre el Proyecto Products Backend

## Descripción General

Este proyecto constituye un backend diseñado para gestionar productos. Emplea Node.js junto con Express para la creación del servidor y utiliza PostgreSQL como base de datos para almacenar información relativa a los productos.

## Requisitos Previos

Asegúrate de contar con Node.js y PostgreSQL instalados en tu sistema antes de comenzar.

## Configuración del Proyecto

1. Clona este repositorio en tu máquina local.

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Instala las dependencias del proyecto.

    ```bash
    npm install
    ```

3. Crea una base de datos en PostgreSQL y actualiza la configuración en el archivo `index.js` con la información correspondiente a tu base de datos.

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

Una vez configurado el proyecto, inicia el servidor con el siguiente comando:

```bash
npm start
```

El servidor se ejecutará en el puerto especificado en la variable de entorno `PORT` o en un puerto predeterminado si no está definido.

## Endpoints Disponibles

- **GET /products:** Obtiene todos los productos almacenados en la base de datos.
  
- **POST /products:** Agrega un nuevo producto a la base de datos. Se espera un cuerpo de solicitud JSON con los campos `Nameproduct`, `price`, y `quantity`.

- **PUT /products/:id:** Actualiza la información de un producto existente. Se espera un cuerpo de solicitud JSON con los campos a actualizar.

- **DELETE /products/:id:** Elimina un producto de la base de datos.

## Middleware

El proyecto implementa middleware para validar la clave de API en cada solicitud. Asegúrate de incluir la clave de API en la solicitud mediante el encabezado `x-api-key`.

## Manejo de Errores

Se ha implementado un middleware centralizado de manejo de errores que captura y registra los errores. Si ocurre un error durante el procesamiento de una solicitud, se enviará una respuesta de estado 500 con el mensaje "Something went wrong!".

## Cierre del Servidor

El servidor gestiona eventos de cierre para asegurar un cierre adecuado de la conexión con la base de datos al salir.
```
