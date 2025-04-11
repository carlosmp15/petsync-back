import { Request, Response } from "express"
import { Op } from 'sequelize'
import Pet from "../models/Pet.model";
import Feeding from "../models/Feeding.model";

/**
 * Función que obtiene todos historiales alimentarios de una mascota por id
 */
export const getAllFeedingsByPetId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const feedings = await Feeding.findAll({
            where: { pet_id: id },
            include: [
                {
                    model: Pet
                }
            ],
            order: [['id', 'ASC']]
        })

        if (!feedings || feedings.length === 0) {
            res.status(404).json({ error: 'No se encontraron historiales alimentarios para la mascota seleccionada' })
            return
        }

        const petData = feedings[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const feedingsData = feedings.map(feeding => {
            const { createdAt, updatedAt, pet, ...rest } = feeding.toJSON()
            return rest // sin el objeto `pet`
        })

        res.json({ pet: petData, data: feedingsData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al obtener el historial alimentario' })
    }
}



/**
 * Función que obtiene los historiales alimentarios entre dos fechas por id mascota
 */
export const getFeedingsFilteredByDates = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { startDate, endDate } = req.query

        const feedings = await Feeding.findAll({
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

        if (!feedings || feedings.length === 0) {
            res.status(404).json({ error: 'No se encontraron registros de alimentación para la mascota seleccionada en el rango de fechas establecido' })
            return
        }

        const petData = feedings[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const feedingsData = feedings.map(feeding => {
            const { createdAt, updatedAt, pet, ...rest } = feeding.toJSON()
            return rest
        })

        res.json({ pet: petData, data: feedingsData })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}


/**
 * Función que da de alta un nuevo historial alimentario
 */
export const createNewFeeding = async (req: Request, res: Response): Promise<void> => {
    try {
        const feeding = await Feeding.create(req.body)
        
        const feedingData = feeding.toJSON()
        delete feedingData.createdAt
        delete feedingData.updatedAt

        res.status(201).json({data: feedingData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que actualiza los datos de un historial alimentario
 */
export const updateFeeding = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const feeding = await Feeding.findByPk(id)

        if (!feeding) {
            res.status(404).json({error: 'Historial alimentario no encontrado'})
            return
        }

        await feeding.update(req.body)

        const feedingData = feeding.toJSON()
        delete feedingData.createdAt
        delete feedingData.updatedAt

        res.json({data: feedingData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que elimina un historial alimentario por id
 */
export const deleteFeeding = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const feeding = await Feeding.findByPk(id)

    if(!feeding) {
        res.status(400).json({
            error: 'Historial alimentario no encontrado'
        })
    }

    await feeding.destroy()
    res.json({data: 'Historial alimentario eliminado'})  
}

