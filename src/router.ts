import { Router } from "express"
import { authUser, createNewUser, deleteUser, forgotPassword, getUserDataById, resetPassword, updateUserData } from "./handlers/users"
import { handleInputErrors } from "./middleware"
import { body, param, query } from "express-validator"
import { createNewPet, deletePet, getAllPetsByUserId, getAllPetsNameByUserId, getPetDataById, updatePetData } from "./handlers/pets"
import { createNewMedicalHistory, deleteMedicalHistory, getAllMedicalHistoryByPetId, getMedicalHistoryFilteredByDates, updateMedicalHistory } from "./handlers/medicalHistory"
import { createNewFeeding, deleteFeeding, getAllFeedingsByPetId, getFeedingsFilteredByDates, updateFeeding } from "./handlers/feedings"
import { createNewDailyActivity, deleteDailyActivity, getAllDailyActivitiesByPetId, getDailyActivitiesFilteredByDates, updateDailyActivity } from "./handlers/dailyActivities"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The User ID
 *         name:
 *           type: string
 *           description: The User name
 *           example: Lucas
 *         surname:
 *           type: string
 *           description: The User surname
 *           example: Fernández Luna
 *         email:
 *           type: string
 *           format: email
 *           description: The User email address
 *           example: lucasfdezluna@gemail.es
 *         phone:
 *           type: string
 *           description: The User phone number
 *           example: +34 000 00 00 00
 *         password:
 *           type: string
 *           description: The User password (DO NOT return in responses for security reasons)
 *           example: 123456
 *         birthday:
 *           type: string
 *           format: date
 *           description: The User birthday
 *           example: 2000-01-01
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Pet ID
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The User ID to whom the pet belongs
 *           example: 1
 *         name:
 *           type: string
 *           description: The Pet name
 *           example: "Mascota 1"
 *         breed:
 *           type: string
 *           description: The Pet breed
 *           example: "Golden Retriever"
 *         gender:
 *           type: string
 *           description: The Pet gender
 *           example: "male"
 *         weight:
 *           type: number
 *           format: float
 *           description: The Pet weight
 *           example: 25.5
 *         birthday:
 *           type: string
 *           format: date
 *           description: The Pet birthday
 *           example: "2020-01-01"
 *         photo:
 *           type: string
 *           description: A photo of the pet (URL)
 *           example: "https://example.com/photo.jpg"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Feeding:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Feeding ID
 *           example: 1
 *         pet_id:
 *           type: integer
 *           description: The Pet ID to whom the feeding belongs
 *           example: 1
 *         type:
 *           type: string
 *           description: The type of food given to the pet (e.g., dry food, wet food, etc.)
 *           example: "Comida seca"
 *         description:
 *           type: string
 *           description: A brief description of the feeding (e.g., "Morning feeding," "Special meal," etc.)
 *           example: "Alimentación matutina con vitaminas extra"
 *         quantity:
 *           type: float
 *           description: The amount of food given (e.g., weight or volume)
 *           example: 200
 *         date:
 *           type: string
 *           format: date
 *           description: The date of feeding history
 *           example: 2025-10-09
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medical History:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The medical history ID
 *         type:
 *           type: string
 *           description: The Medical History type
 *           example: Vacunación
 *         description:
 *           type: string
 *           description: The Medical History description
 *           example: Recibió la vacuna contra la rabia
 *         date:
 *           type: string
 *           format: date
 *           description: The Medical History birthday
 *           example: 2025-04-12
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Daily Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The daily activity ID
 *         pet_id:
 *           type: integer
 *           description: The Pet ID to whom the daily activity belongs
 *           example: 1
 *         type:
 *           type: string
 *           description: Type of activity performed by the pet (e.g., walk, play, training)
 *           example: Caminar
 *         duration:
 *           type: number
 *           description: Duration of the activity in minutes
 *           example: 30
 *         notes:
 *           type: string
 *           description: Additional notes or observations related to the activity
 *           example: La mascota parecía tener mucha energía hoy
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the activity took place
 *           example: 2025-04-14
 */

/**
 * @swagger
 * /api/v1/user/data/{id}:
 *   get:
 *     summary: Get personal user data by id 
 *     description: Return user data
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/data/:id',
    param('id')
        .notEmpty().withMessage('El id del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del usuario debe ser un número entero positivo'),
    handleInputErrors,
    getUserDataById
)

/**
 * @swagger
 * /api/v1/pet/user/{id}:
 *   get:
 *     summary: Get all pets of a user by id
 *     description: Return all pets associated with a specific user by id
 *     tags:
 *       - Pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose pets are to be retrieved
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/pet/user/:id', 
    param('id')
        .notEmpty().withMessage('El id del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del usuario debe ser un número entero positivo'),
    handleInputErrors,   
    getAllPetsByUserId
)

router.get('/pet/name/user/:id', 
    param('id')
        .notEmpty().withMessage('El id del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del usuario debe ser un número entero positivo'),
    handleInputErrors,   
    getAllPetsNameByUserId
)

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   get:
 *     summary: Get pet data by ID
 *     description: Return the data of a specific pet by id
 *     tags:
 *       - Pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de la mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de la mascota debe ser un número entero positivo'),
    handleInputErrors,   
    getPetDataById
)

// Obtiene todos los historiales médicos de una mascota por id
/**
 * @swagger
 * /api/v1/medical_history/pet/{id}:
 *   get:
 *     summary: Get medical histories by pet ID
 *     description: Returns the data of a specific pet by id
 *     tags:
 *       - Medical History
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose medical history history is to be retrieved
 *     responses:
 *       200:
 *         description: Successful response with medical history data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medical History'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/medical_history/pet/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllMedicalHistoryByPetId
)

/**
 * @swagger
 * /api/v1/medical_history/pet/date/{id}:
 *   get:
 *     summary: Get medical histories by pet ID and date range
 *     description: Returns the data of a specific medical histories by ID and within a date range.
 *     tags:
 *       - Medical History
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose medical history is to be retrieved
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the medical history
 *         example: "2025-04-01"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the medical history
 *         example: "2025-05-01"
 *     responses:
 *       200:
 *         description: Successful response with medical histories data between the specified dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medical History'
 *       400:
 *         description: Bad Request - Invalid ID or date format
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/medical_history/pet/date/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    query('startDate')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isDate().withMessage('Debe ser una fecha válida'),
    query('endDate')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isDate().withMessage('Debe ser una fecha válida'),
    handleInputErrors,
    getMedicalHistoryFilteredByDates
)

/**
 * @swagger
 * /api/v1/feeding/pet/date/{id}:
 *   get:
 *     summary: Get feeding history by pet ID and date range
 *     description: Returns the data of a specific feeding by ID and within a date range.
 *     tags:
 *       - Feeding
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose feeding history is to be retrieved
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the feeding history 
 *         example: "2025-04-01"
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the feeding history
 *         example: "2025-05-01"
 *     responses:
 *       200:
 *         description: Successful response with feeding data between the specified dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feeding'
 *       400:
 *         description: Bad Request - Invalid ID or date format
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/feeding/pet/date/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    query('startDate')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isDate().withMessage('Debe ser una fecha válida'),
    query('endDate')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isDate().withMessage('Debe ser una fecha válida'),
    handleInputErrors,
    getFeedingsFilteredByDates
)

/**
 * @swagger
 * /api/v1/daily_activities/pet/date/{id}:
 *   get:
 *     summary: Get daily activities history by pet ID and date range
 *     description: Returns the daily activities for a specific pet within a given date range.
 *     tags:
 *       - Daily Activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose daily activity history is to be retrieved
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for the daily activity history
 *         example: '2025-04-01'
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for the daily activity history
 *         example: '2025-05-01'
 *     responses:
 *       200:
 *         description: Successful response with daily activities data between the specified dates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Daily Activity'
 *       400:
 *         description: Bad Request - Invalid ID or date format
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/daily_activities/pet/date/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    query('startDate')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isDate().withMessage('Debe ser una fecha válida'),
    query('endDate')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isDate().withMessage('Debe ser una fecha válida'),
    handleInputErrors,
    getDailyActivitiesFilteredByDates
)

/**
 * @swagger
 * /api/v1/feeding/pet/{id}:
 *   get:
 *     summary: Get feeding history by pet ID
 *     description: Returns the data of a specific feeding by id
 *     tags:
 *       - Feeding
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose feeding history is to be retrieved
 *     responses:
 *       200:
 *         description: Successful response with feeding data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feeding'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/feeding/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllFeedingsByPetId
)

/**
 * @swagger
 * /api/v1/daily_activities/pet/{id}:
 *   get:
 *     summary: Get daily activities by pet ID
 *     description: Returns the daily activity records for a specific pet by its ID
 *     tags:
 *       - Daily Activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pet whose daily activities are to be retrieved
 *     responses:
 *       200:
 *         description: Successful response with daily activity data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Daily Activity'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/daily_activities/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllDailyActivitiesByPetId
)

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user and return user data
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response, user created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/user',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('birthday').isDate().withMessage('Debe ser una fecha válida'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    createNewUser
)

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Solicita restablecimiento de contraseña
 *     description: Envía un correo electrónico con un token para restablecer la contraseña si el correo está registrado.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *       400:
 *         description: Error de validación o correo no registrado
 */
router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Correo inválido'),
  handleInputErrors,
  forgotPassword
)

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Restablece la contraseña
 *     description: Permite cambiar la contraseña usando un token recibido por correo.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *               newPassword:
 *                 type: string
 *                 example: nuevaClaveSegura123
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Token inválido, expirado o datos faltantes
 */
router.post(
  '/reset-password',
  body('token').notEmpty().withMessage('El token es obligatorio'),
  body('newPassword')
    .notEmpty().withMessage('La nueva contraseña es obligatoria'),
  handleInputErrors,
  resetPassword
)

/**
 * @swagger
 * /api/v1/user/auth:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticates a user by email and password and returns user data or token
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: lucasfdezluna@gemail.es
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/user/auth',
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatorio'),
    handleInputErrors,
    authUser
)

/**
 * @swagger
 * /api/v1/pet:
 *   post:
 *     summary: Create a new pet
 *     description: Create a new pet and return pet data
 *     tags:
 *       - Pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the pet
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The name of the pet
 *                 example: Rex
 *               breed:
 *                 type: string
 *                 description: The breed of the pet
 *                 example: Doberman Pinscher
 *               gender:
 *                 type: string
 *                 description: The gender of the pet
 *                 example: Male
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the pet in kilograms
 *                 example: 30.5
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The birthday of the pet
 *                 example: "2020-05-15"
 *               photo:
 *                 type: string
 *                 description: A photo of the pet (URL or base64 encoded)
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       200:
 *         description: Successful response, pet created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Bad Request - Missing required fields or invalid data
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/pet',
    body('user_id').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('breed').notEmpty().withMessage('La raza es obligatoria'),
    body('gender').notEmpty().withMessage('El género es obligatorio'),
    body('weight').notEmpty().withMessage('El peso es obligatorio'),
    body('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('photo').notEmpty().withMessage('La foto es obligatoria'),
    handleInputErrors,
    createNewPet
)

/**
 * @swagger
 * /api/v1/medical_history:
 *   post:
 *     summary: Create a new medical history
 *     description: Create a new medical history and return pet data
 *     tags:
 *       - Medical History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: The ID of the pet to which the medical history belongs
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: The type of the medical history record (e.g., vaccination, checkup)
 *                 example: "Vacunación"
 *               description:
 *                 type: string
 *                 description: A detailed description of the medical history entry
 *                 example: "Recibió la vacuna contra la rabia"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date when the medical history event occurred
 *                 example: "2025-04-12"
 *     responses:
 *       200:
 *         description: Successful response, medical history created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medical History'
 *       400:
 *         description: Bad Request - Missing or invalid input data
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/medical_history',
    body('pet_id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de historial médico es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de historial médico es obligatorio'),
    body('date')
        .notEmpty().withMessage('La fecha de historial médico es obligatorio')
        .isDate().withMessage('La fecha del historial médico debe ser válida'),
    handleInputErrors,
    createNewMedicalHistory
)

/**
 * @swagger
 * /api/v1/feeding:
 *   post:
 *     summary: Create a new feeding history
 *     description: Creates a new feeding history record for a pet
 *     tags:
 *       - Feeding
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: The ID of the pet for which the feeding history is being created
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: The type of feeding (e.g., dry food, wet food)
 *                 example: "Dry food"
 *               description:
 *                 type: string
 *                 description: A detailed description of the feeding
 *                 example: "Pet was fed with 200 grams of dry food."
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: The quantity of food consumed
 *                 example: 200.5
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date the feeding occurred
 *                 example: "2025-04-12"
 *     responses:
 *       200:
 *         description: Successful response, feeding created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feeding'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/feeding',
    body('pet_id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de historial alimentario es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de historial alimentario es obligatorio'),
    body('quantity')
        .notEmpty().withMessage('La cantidad de historial alimentario es obligatorio')
        .isFloat().withMessage('La cantidad de historial alimentario debe ser un número decimal'),
    body('date')
        .notEmpty().withMessage('La fecha de historial alimentario es obligatorio')
        .isDate().withMessage('La fecha del historial alimentario debe ser válida'),
    handleInputErrors,
    createNewFeeding
)

/**
 * @swagger
 * /api/v1/daily_activity:
 *   post:
 *     summary: Create a new daily activity history
 *     description: Creates a new daily activity history record for a pet
 *     tags:
 *       - Daily Activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: The Pet ID to whom the daily activity belongs
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: Type of activity performed by the pet (e.g., walk, play, training)
 *                 example: Caminar
 *               duration:
 *                 type: number
 *                 description: Duration of the activity in minutes
 *                 example: 30
 *               notes:
 *                 type: string
 *                 description: Additional notes or observations related to the activity
 *                 example: La mascota parecía tener mucha energía hoy
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date when the activity took place
 *                 example: 2025-04-14
 *     responses:
 *       200:
 *         description: Successful response, daily activity created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Daily Activity'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/daily_activity',
    body('pet_id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de actividad diaria es obligatoria'),
    body('notes')
        .notEmpty().withMessage('Las notas de actividad diaria es obligatoria'),
    body('duration')
        .notEmpty().withMessage('La duración de la actividad diaria es obligatoria')
        .isInt({ gt: 0 }).withMessage('La duración debe ser un número entero'),
    body('date')
        .notEmpty().withMessage('La fecha de actividad diaria es obligatoria')
        .isDate().withMessage('La fecha del historial alimentario debe ser válida'),
    handleInputErrors,
    createNewDailyActivity
)

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update user data
 *     description: Updates an existing user's data by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The User name
 *                 example: Lucas
 *               surname:
 *                 type: string
 *                 description: The User surname
 *                 example: Fernández Luna
 *               email:
 *                 type: string
 *                 description: The User email
 *                 example: lucasfdezluna@gmail.es
 *               phone:
 *                 type: string
 *                 description: The User phone
 *                 example: "+34 000 00 00 00"
 *               password:
 *                 type: string
 *                 description: The User password
 *                 example: "123456"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The User birthday
 *                 example: "2000-01-01"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/user/:id',
    param('id').isInt({ gt: 0 }).withMessage('El ID debe ser un número entero válido'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('birthday').isDate().withMessage('Debe ser una fecha válida'),
    handleInputErrors,
    updateUserData
)

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   put:
 *     summary: Update pet data
 *     description: Updates an existing pet's data by ID
 *     tags:
 *       - Pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the pet to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns the pet
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The name of the pet
 *                 example: Rex
 *               breed:
 *                 type: string
 *                 description: The breed of the pet
 *                 example: Doberman Pinscher
 *               gender:
 *                 type: string
 *                 description: The gender of the pet
 *                 example: Male
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the pet in kilograms
 *                 example: 30.5
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The birthday of the pet
 *                 example: "2020-05-15"
 *               photo:
 *                 type: string
 *                 description: A photo of the pet (URL)
 *                 example: "https://example.com/photo.jpg"
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/pet/:id',
    param('id').notEmpty().withMessage('El ID de mascota es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('breed').notEmpty().withMessage('La raza es obligatoria'),
    body('gender').notEmpty().withMessage('El género es obligatorio'),
    body('weight').notEmpty().withMessage('El peso es obligatorio'),
    body('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('photo').notEmpty().withMessage('La foto es obligatoria'),
    handleInputErrors,
    updatePetData
)

/**
 * @swagger
 * /api/v1/medical_history/{id}:
 *   put:
 *     summary: Update an existing medical history record
 *     description: Update a specific medical history record by ID
 *     tags:
 *       - Medical History
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the medical history record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the medical history record (e.g., vaccination, checkup)
 *                 example: "Vaccination"
 *               description:
 *                 type: string
 *                 description: A detailed description of the medical history entry
 *                 example: "Received rabies vaccination"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date when the medical history event occurred
 *                 example: "2025-04-12"
 *     responses:
 *       200:
 *         description: Medical history record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medical History'
 *       400:
 *         description: Bad Request - Missing or invalid input data
 *       404:
 *         description: Not found - Medical history record not found
 *       500:
 *         description: Internal Server Error - Something went wrong on the server
 */
router.put('/medical_history/:id',
    param('id')
        .notEmpty().withMessage('El id del historial médico es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de historial médico es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de historial médico es obligatorio'),
    body('date')
        .notEmpty().withMessage('La fecha de historial médico es obligatorio')
        .isDate().withMessage('La fecha del historial médico debe ser válida'),
    handleInputErrors,
    updateMedicalHistory
)

/**
 * @swagger
 * /api/v1/feeding/{id}:
 *   put:
 *     summary: Update a feeding history by ID
 *     description: Updates an existing feeding history record by ID
 *     tags:
 *       - Feeding
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the feeding history to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: The ID of the pet for which the feeding history is being updated
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: The type of feeding (e.g., dry food, wet food)
 *                 example: "Comida húmeda"
 *               description:
 *                 type: string
 *                 description: A detailed description of the feeding
 *                 example: "La mascota fue alimentada con 150 gramos de comida húmeda"
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: The quantity of food consumed
 *                 example: 150.5
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date the feeding occurred
 *                 example: "2025-04-15"
 *     responses:
 *       200:
 *         description: Successful response with the updated feeding history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feeding'
 *       400:
 *         description: Bad Request - Invalid input data
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/feeding/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de historial alimentario es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de historial alimentario es obligatorio'),
    body('quantity')
        .notEmpty().withMessage('La cantidad de historial alimentario es obligatorio')
        .isFloat({ gt: 0 }).withMessage('La cantidad de historial alimentario debe ser un número entero decimal'),
    body('date')
        .notEmpty().withMessage('La fecha de historial alimentario es obligatorio')
        .isDate().withMessage('La fecha del historial alimentario debe ser válida'),
    handleInputErrors,
    updateFeeding
)

/**
 * @swagger
 * /api/v1/daily_activity/{id}:
 *   put:
 *     summary: Update an existing daily activity
 *     description: Updates a specific daily activity history record for a pet by its ID
 *     tags:
 *       - Daily Activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the daily activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pet_id:
 *                 type: integer
 *                 description: The Pet ID to whom the daily activity belongs
 *                 example: 1
 *               type:
 *                 type: string
 *                 description: Type of activity performed by the pet (e.g., walk, play, training)
 *                 example: "Caminar"
 *               duration:
 *                 type: number
 *                 description: Duration of the activity in minutes
 *                 example: 30
 *               notes:
 *                 type: string
 *                 description: Additional notes or observations related to the activity
 *                 example: "La mascota parecía tener mucha energía hoy"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date when the activity took place
 *                 example: "2025-04-14"
 *     responses:
 *       200:
 *         description: Successful response, daily activity updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Daily Activity'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Daily activity not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/daily_activity/:id', 
    param('id')
        .notEmpty().withMessage('El id de actividad diaria es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de actividad diaria debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de actividad diaria es obligatoria'),
    body('duration')
        .notEmpty().withMessage('La duración de la actividad diaria es obligatoria')
        .isInt({ gt: 0 }).withMessage('La duración debe ser un número entero'),
    body('date')
        .notEmpty().withMessage('La fecha de actividad diaria es obligatoria')
        .isDate().withMessage('La fecha del historial alimentario debe ser válida'),
    updateDailyActivity
)

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     description: Deletes a user by its id
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/user/:id', 
    param('id')
        .notEmpty().withMessage('El id de usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de usuario debe ser un número entero positivo'),
    handleInputErrors,
    deleteUser
)

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   delete:
 *     summary: Delete a pet by id
 *     description: Deletes a pet by its id
 *     tags:
 *       - Pet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the pet to delete
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    deletePet
)

/**
 * @swagger
 * /api/v1/medical_history/{id}:
 *   delete:
 *     summary: Delete a medical history by id
 *     description: Deletes a medical history by its id
 *     tags:
 *       - Medical History
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the medical history to delete
 *     responses:
 *       200:
 *         description: Medical History deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/medical_history/:id', 
    param('id')
        .notEmpty().withMessage('El id del historial médico es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del historial médico debe ser un número entero positivo'),
    handleInputErrors,
    deleteMedicalHistory
)

/**
 * @swagger
 * /api/v1/feeding/{id}:
 *   delete:
 *     summary: Delete a feeding by id
 *     description: Deletes a feeding by its id
 *     tags:
 *       - Feeding
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the feeding to delete
 *     responses:
 *       200:
 *         description: Feeding deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/feeding/:id', 
    param('id')
        .notEmpty().withMessage('El id del historial alimentario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del historial alimentario debe ser un número entero positivo'),
    handleInputErrors,
    deleteFeeding
)

/**
 * @swagger
 * /api/v1/daily_activity/{id}:
 *   delete:
 *     summary: Delete a daily activity by id
 *     description: Deletes a daily activity by its id
 *     tags:
 *       - Daily Activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the daily activity to delete
 *     responses:
 *       200:
 *         description: Daily Activity deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/daily_activity/:id', 
    param('id')
        .notEmpty().withMessage('El id de actividad diaria es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de actividad diaria debe ser un número entero positivo'),
    handleInputErrors,
    deleteDailyActivity
)


export default router