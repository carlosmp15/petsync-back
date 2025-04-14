import { Request, Response } from "express"
import Pet from "../models/Pet.model";

/**
 * Función que obtiene todas las mascotas por id usuario
 */
export const getAllPetsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const pets = await Pet.findAll({
            where: { user_id: id }, // Filtramos por user_id
        })

        if (!pets || pets.length === 0) {
            res.status(404).json({ error: 'No se encontraron mascotas para este usuario' })
            return
        }

        const petData = pets.map(pet => {
            const petJson = pet.toJSON()
            delete petJson.user_id
            delete petJson.createdAt
            delete petJson.updatedAt
            return petJson
        })

        res.json({data: petData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}


/**
 * Función que obtiene los datos personales de una mascota por id
 */
export const getPetDataById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params
        const pet = await Pet.findByPk(id)

        if(!pet) {
            res.status(400).json({
                error: 'Mascota no encontrada'
            })
        }
        const petData = pet.toJSON()
        delete petData.createdAt
        delete petData.updatedAt

        res.json({data: petData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que da de alta una nueva mascota
 */
export const createNewPet = async (req: Request, res: Response): Promise<void> => {
    try {
        const pet = await Pet.create(req.body)
        
        const petData = pet.toJSON()
        delete petData.user_id
        delete petData.createdAt
        delete petData.updatedAt

        res.status(201).json({data: petData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que actualiza los datos personales de una mascota
 */
export const updatePetData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const pet = await Pet.findByPk(id)

        if (!pet) {
            res.status(404).json({error: 'Mascota no encontrada'})
            return
        }

        await pet.update(req.body)

        const petData = pet.toJSON()
        delete petData.user_id
        delete petData.createdAt
        delete petData.updatedAt

        res.json({data: petData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que elimina una mascota por id mascota
*/
export const deletePet = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const pet = await Pet.findByPk(id)

    if(!pet) {
        res.status(400).json({error: 'Mascota no encontrada'})
        return
    }

    await pet.destroy()
    res.json({data: 'Mascota eliminada'})  
}