import express from "express"
import colors from 'colors'
import SwaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"
import router from "./router"
import db from "./config/db"
import cors, { CorsOptions } from 'cors'


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

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else{
            callback(new Error('Error de CORS'));
        }
    }
}
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json())
server.use('/api/v1', router)

// Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))

export {
    server
}
