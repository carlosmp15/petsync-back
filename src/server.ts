import express from "express"
import colors from 'colors'
import SwaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"
import router from "./router"
import db from "./config/db"
import path from 'path'


// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()


// Instancia de express
const server = express()

// Servir archivos estáticos desde /public
server.use('/public', express.static(path.join(__dirname, '../public')))


// Leer datos de formularios
server.use(express.json())
server.use('/api/v1', router)

// Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))

export {
    server
}
