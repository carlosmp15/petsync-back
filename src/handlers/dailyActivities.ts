import { Request, Response } from "express"
import { Op } from 'sequelize'
import Pet from "../models/Pet.model";
import Feeding from "../models/Feeding.model";
import DailyAcitivity from "../models/DailyActivity.model";

/**
 * Función que obtiene todas las actividades diarias de una mascota por id
 */
export const getAllDailyActivitiesByPetId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const activities = await DailyAcitivity.findAll({
            where: { pet_id: id },
            include: [
                {
                    model: Pet
                }
            ],
            order: [['id', 'ASC']]
        })

        if (!activities || activities.length === 0) {
            res.status(404).json({ error: 'No se encontraron actividades diarias para la mascota seleccionada' })
            return
        }

        const petData = activities[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const activitiesData = activities.map(activity => {
            const { createdAt, updatedAt, pet, ...rest } = activity.toJSON()
            return rest // sin el objeto `pet`
        })

        res.json({ pet: petData, data: activitiesData })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}



/**
 * Función que obtiene las actividades diarias entre dos fechas por id mascota
 */
export const getDailyActivitiesFilteredByDates = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { startDate, endDate } = req.query

        const activities = await DailyAcitivity.findAll({
            where: {
                pet_id: id,
                date: {
                    [Op.between]: [new Date(startDate as string), new Date(endDate as string)]
                }
            },
            include: [
                {
                    model: Pet
                }
            ],
            order: [['id', 'ASC']]
        })

        if (!activities || activities.length === 0) {
            res.status(404).json({ error: 'No se encontraron actividades diarias para la mascota seleccionada en el rango de fechas establecido' })
            return
        }

        const petData = activities[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const activitiesData = activities.map(activity => {
            const { createdAt, updatedAt, pet, ...rest } = activity.toJSON()
            return rest
        })

        res.json({ pet: petData, data: activitiesData })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}


/**
 * Función que da de alta un nuevo historial alimentario
 */
export const createNewDailyActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const activity = await DailyAcitivity.create(req.body)
        
        const activityData = activity.toJSON()
        delete activityData.createdAt
        delete activityData.updatedAt

        res.status(201).json({data: activityData})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que actualiza los datos de una actividad diaria
 */
export const updateDailyActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const activity = await DailyAcitivity.findByPk(id)

        if (!activity) {
            res.status(404).json({error: 'Actividad diaria no encontrada'})
            return
        }

        await activity.update(req.body)

        const activityData = activity.toJSON()
        delete activityData.createdAt
        delete activityData.updatedAt

        res.json({data: activityData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que elimina un historial alimentario por id
 */
export const deleteDailyActivity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const activity = await DailyAcitivity.findByPk(id)

        if(!activity) {
            res.status(400).json({
                error: 'Actividad diaria no encontrada'
            })
        }

        await activity.destroy()
        res.json({data: 'Actividad diaria eliminado'})     
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

