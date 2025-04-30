import { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from "../models/User.model"

/**
 * Función que obtiene los datos personales del usuario por id
 */
export const getUserDataById = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params
        const user = await User.findByPk(id)

        if(!user) {
            res.status(400).json({
                error: 'Usuario no encontrado'
            })
        }
        const userData = user.toJSON()
        delete userData.password // no devolver la contraseña
        delete userData.createdAt
        delete userData.updatedAt

        res.json({data: userData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

/**
 * Función que da de alta un nuevo usuario
 */
export const createNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password, ...rest } = req.body

        const salt = await bcrypt.genSalt(10) // hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            ...rest,
            password: hashedPassword
        })

        const userData = user.toJSON()
        delete userData.password
        delete userData.createdAt
        delete userData.updatedAt

        res.json({data: userData})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}


/**
 * Función que actualiza los datos personales de un usuario
 */
export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
  
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' })
        return
      }
  
      const { password, ...otherFields } = req.body
  
      // Solo si la contraseña no está vacía ni compuesta solo por espacios
      if (typeof password === 'string' && password.trim() !== '') {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        otherFields.password = hashedPassword // agregar la nueva contraseña al objeto
      }
  
      await user.update(otherFields)
  
      const userData = user.toJSON()
      delete userData.password
      delete userData.createdAt
      delete userData.updatedAt
  
      res.json({ data: userData })
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  


/**
 * Función que autentica un usuario por email y contraseña
 */
export const authUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            res.json({ authenticated: false, message: "Usuario o contraseña incorrectos" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password) // comprobar contraseña

        if (!isMatch) {
            res.json({ authenticated: false, message: "Usuario o contraseña incorrectos" })
            return
        }

        const userData = user.toJSON()
        delete userData.password
        delete userData.createdAt
        delete userData.updatedAt

        res.json({
            authenticated: true,
            results: {
                message: "El usuario ha sido autenticado exitosamente.",
                results: userData
            }
        });          

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
        return
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const product = await User.findByPk(id)

    if(!product) {
        res.status(400).json({
            error: 'Usuario no encontrado'
        })
    }

    await product.destroy()
    res.json({data: 'Usuario eliminado'})  
}


