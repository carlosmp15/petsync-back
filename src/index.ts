import dotenv from 'dotenv'
dotenv.config()

import colors from 'colors'
import { server } from './server'

console.log('User:', process.env.MAIL_USER)
console.log('Pass:', process.env.MAIL_PASS)


const port = process.env.PORT || 4000
server.listen(port, () => {
  console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})
