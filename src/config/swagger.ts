import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'User',
                description: 'API operation related to user'
            },
            {
                name: 'Pet',
                description: 'API operation related to users pets'
            },
            {
                name: 'Feeding',
                description: 'API operation related to pet feedings'
            },
            {
                name: 'Medical History',
                description: 'API operation related to pet medical histories'
            },
            {
                name: 'Daily Activity',
                description: 'API operation related to daily activities'
            }
        ],
        info: {
            title: 'REST API PetSync / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for PetSync'
        }
    }, 
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API PetSync'
}

export default swaggerSpec
export {
    swaggerUiOptions
}