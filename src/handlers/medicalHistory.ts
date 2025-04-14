import { Request, Response } from "express"
import { Op } from 'sequelize'
import MedicalHistory from "../models/MedicalHistory.model"
import Pet from "../models/Pet.model";

/**
 * Función que obtiene todos los historiales médicos por id mascota
 */
export const getAllMedicalHistoryByPetId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const medicalHistories = await MedicalHistory.findAll({
            where: { pet_id: id },
            include: [
                {
                    model: Pet
                }
            ],
            order: [['id', 'ASC']]
        })

        if (!medicalHistories || medicalHistories.length === 0) {
            res.status(404).json({ error: 'No se encontraron historiales médicos para la mascota seleccionada' })
            return
        }

        const petData = medicalHistories[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const medicalHistoriesData = medicalHistories.map(medicalHistory => {
            const { pet, createdAt, updatedAt, ...rest } = medicalHistory.toJSON()
            return rest
        })

        res.json({ pet: petData, data: medicalHistoriesData })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}


/**
 * Función que obtiene los historiales médicos entre dos fechas por id mascota
 */
export const getMedicalHistoryFilteredByDates = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { startDate, endDate } = req.query

        const medicalHistories = await MedicalHistory.findAll({
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

        if (!medicalHistories || medicalHistories.length === 0) {
            res.status(404).json({ error: 'No se encontraron historiales médicos para la mascota seleccionada en el rango de fechas establecido' })
            return
        }

        const petData = medicalHistories[0].pet?.toJSON()
        if (petData) {
            delete petData.createdAt
            delete petData.updatedAt
        }

        const medicalHistoriesData = medicalHistories.map(medicalHistory => {
            const { pet, createdAt, updatedAt, ...rest } = medicalHistory.toJSON()
            return rest
        })

        res.json({ pet: petData, data: medicalHistoriesData })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que da de alta un nuevo historial médico
 */
export const createNewMedicalHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const medicalHistory = await MedicalHistory.create(req.body)
        
        const medicalHistoryData = medicalHistory.toJSON()
        delete medicalHistoryData.createdAt
        delete medicalHistoryData.updatedAt

        res.status(201).json({data: medicalHistoryData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que actualiza los datos de un historial médico
 */
export const updateMedicalHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const medicalHistory = await MedicalHistory.findByPk(id)

        if (!medicalHistory) {
            res.status(404).json({error: 'Historial médico no encontrado'})
            return
        }

        await medicalHistory.update(req.body)

        const medicalHistoryData = medicalHistory.toJSON()
        delete medicalHistoryData.createdAt
        delete medicalHistoryData.updatedAt

        res.json({data: medicalHistoryData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que elimina un historial médico por id
 */
export const deleteMedicalHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const medicalHistory = await MedicalHistory.findByPk(id)

        if(!medicalHistory) {
            res.status(400).json({
                error: 'Historial médico no encontrado'
            })
        }

        await medicalHistory.destroy()
        res.json({data: 'Historial médico eliminado'}) 
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

