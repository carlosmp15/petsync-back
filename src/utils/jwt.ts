import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("Falta la variable de entorno JWT_SECRET")
}

export const generateResetToken = (userId: number): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyResetToken = (token: string): { id: number } => {
  return jwt.verify(token, JWT_SECRET) as { id: number }
}
