import { Router } from "express"
import { authUser, createNewUser, getUserDataById, updateUserData } from "./handlers/users"
import { handleInputErrors } from "./middleware"
import { body, param, query } from "express-validator"
import { createNewPet, deletePet, getAllPetsByUserId, getPetDataById, updatePetData } from "./handlers/pets"
import { createNewMedicalHistory, deleteMedicalHistory, getAllMedicalHistoryByPetId, getMedicalHistoryFilteredByDates, updateMedicalHistory } from "./handlers/medicalHistory"
import { createNewFeeding, deleteFeeding, getAllFeedingsByPetId, getFeedingsFilteredByDates, updateFeeding } from "./handlers/feedings"
import { createNewDailyActivity, deleteDailyActivity, getAllDailyActivitiesByPetId, getDailyActivitiesFilteredByDates, updateDailyActivity } from "./handlers/dailyActivities"

const router = Router()


// Obtiene los datos personales del usuario por id
router.get('/user/data/:id',
    param('id')
        .notEmpty().withMessage('El id del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del usuario debe ser un número entero positivo'),
    handleInputErrors,
    getUserDataById
)

// Obtiene todas las mascotas de un usuario por id
router.get('/pet/user/:id', 
    param('id')
        .notEmpty().withMessage('El id del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del usuario debe ser un número entero positivo'),
    handleInputErrors,   
    getAllPetsByUserId
)

// Obtiene los datos personales de una mascota por id
router.get('/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de la mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de la mascota debe ser un número entero positivo'),
    handleInputErrors,   
    getPetDataById
)

// Obtiene todos los historiales médicos de una mascota por id
router.get('/medical_history/pet/:id',
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllMedicalHistoryByPetId
)

// Obtiene todos los historiales médicos entre dos fechas de una mascota por id
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

// Obtiene todos los historiales alimentarios entre dos fechas de una mascota por id
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

// Obtiene todos las actividades diarias entre dos fechas de una mascota por id
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

// Obtiene todos los historiales alimentarios de una mascota por id
router.get('/feeding/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllFeedingsByPetId
)

//
router.get('/daily_activities/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    getAllDailyActivitiesByPetId
)

// Da de alta un nuevo usuario
router.post('/user',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('birthday').isDate().withMessage('Debe ser una fecha válida'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleInputErrors,
    createNewUser
)

// Da de alta una nueva mascota
router.post('/pet',
    body('user_id').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('breed').notEmpty().withMessage('La raza es obligatoria'),
    body('species').notEmpty().withMessage('La especie es obligatoria'),
    body('gender').notEmpty().withMessage('El género es obligatorio'),
    body('weight').notEmpty().withMessage('El peso es obligatorio'),
    body('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('photo').notEmpty().withMessage('La foto es obligatoria'),
    handleInputErrors,
    createNewPet
)

// Da de alta un nuevo historial médico
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

// Da de alta un nuevo historial alimentario
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

// Da de alta una nueva actividad diaria
router.post('/daily_activity',
    body('pet_id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    body('type')
        .notEmpty().withMessage('El tipo de actividad diaria es obligatoria'),
    body('duration')
        .notEmpty().withMessage('La duración de la actividad diaria es obligatoria')
        .isInt({ gt: 0 }).withMessage('La duración debe ser un número entero'),
    body('date')
        .notEmpty().withMessage('La fecha de actividad diaria es obligatoria')
        .isDate().withMessage('La fecha del historial alimentario debe ser válida'),
    handleInputErrors,
    createNewDailyActivity
)


// Autentica un usuario por email y contraseña
router.post('/user/auth',
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatorio'),
    handleInputErrors,
    authUser
)


// Actualiza los datos personales de un usuario
router.put('/user/:id',
    param('id').isInt({ gt: 0 }).withMessage('El ID debe ser un número entero válido'),
    body('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').optional().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').optional().isEmail().withMessage('Debe ser un email válido'),
    body('phone').optional().notEmpty().withMessage('El teléfono es obligatorio'),
    body('birthday').optional().isDate().withMessage('Debe ser una fecha válida'),
    handleInputErrors,
    updateUserData
)

// Actualiza los datos personales de una mascota
router.put('/pet/:id',
    body('user_id').notEmpty().withMessage('El ID de usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('surname').notEmpty().withMessage('El apellido es obligatorio'),
    body('breed').notEmpty().withMessage('La raza es obligatoria'),
    body('species').notEmpty().withMessage('La especie es obligatoria'),
    body('gender').notEmpty().withMessage('El género es obligatorio'),
    body('weight').notEmpty().withMessage('El peso es obligatorio'),
    body('birthday')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isDate().withMessage('La fecha de nacimiento debe ser válida'),
    body('photo').notEmpty().withMessage('La foto es obligatoria'),
    handleInputErrors,
    updatePetData
)

// Actualiza los datos de un historial médico
router.put('/medical_history/:id',
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
    updateMedicalHistory
)

// Actualiza los datos de un historial alimentario
router.put('/feeding/:id',
    body('pet_id')
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

// Actualiza los datos de una actividad diaria
router.put('/daily_activity/:id', 
    body('pet_id')
        .notEmpty().withMessage('El id de mascota es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
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

// Elimina una mascota por id
router.delete('/pet/:id', 
    param('id')
        .notEmpty().withMessage('El id de mascota obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de mascota debe ser un número entero positivo'),
    handleInputErrors,
    deletePet
)

// Elimina un historial médico por id
router.delete('/medical_history/:id', 
    param('id')
        .notEmpty().withMessage('El id del historial médico es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del historial médico debe ser un número entero positivo'),
    handleInputErrors,
    deleteMedicalHistory
)

// Elimina un historial alimentario por id
router.delete('/feeding/:id', 
    param('id')
        .notEmpty().withMessage('El id del historial alimentario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id del historial alimentario debe ser un número entero positivo'),
    handleInputErrors,
    deleteFeeding
)

// Elimina una actividad diaria por id
router.delete('/daily_activity/:id', 
    param('id')
        .notEmpty().withMessage('El id de actividad diaria es obligatorio')
        .isInt({ gt: 0 }).withMessage('El id de actividad diaria debe ser un número entero positivo'),
    handleInputErrors,
    deleteDailyActivity
)


export default router