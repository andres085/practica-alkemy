# Challenge de Alkemy -  Backend NodeJS

## Disney API

### Objetivo

Desarrollar una API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron. Por otro lado, deberá
exponer la información para que cualquier frontend pueda consumirla.

### Documentación POSTMAN

[Link Documentación](https://documenter.getpostman.com/view/11899197/UVeAwUyM)

## Para levantar el Challenge

**En un terminal escribir**

Para HTTPS

`git clone https://github.com/andres085/practica-alkemy.git`

Para SSH

`git clone git@github.com:andres085/practica-alkemy.git`

**Ingresar a la carpeta practica-alkemy**

`cd practica-alkemy`

**Copiar y renombrar el archivo env.example como .env**

`cp env.example .env`

Ejemplo .env

MYSQLDB_USER=user
MYSQLDB_PASSWORD=123456
MYSQLDB_ROOT_PASSWORD=123456
MYSQLDB_DATABASE=disney_db
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080

**Levantar docker**

En un terminal

`docker-compose up -d`

**Entrar a la carpeta src**

`cd src/`

**Copiar y renombrar el archivo env.example como .env**

`cp env.example .env`

Agregar la API_KEY para SendGrid

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=disney_db
DB_PORT=3306

SECRET=secret

SENDGRID_API_KEY=API_KEY

NODE_DOCKER_PORT=8000 

**Ejecutar el comando npm install**

`npm install`

**Ejecutar el comando node index.js o nodemon index.js para levantar el proyecto**

`node index.js`

`nodemon index.js`




