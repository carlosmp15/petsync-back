import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


export const verifySMTP = async () => {
  try {
    await transporter.verify()
    console.log('✅ Servidor SMTP está listo para enviar correos')
  } catch (error) {
    console.error('❌ Error verificando servidor SMTP:', error)
  }
}

export const sendResetEmail = async (to: string, resetUrl: string) => {
  await transporter.sendMail({
  from: `"PetSync App" <${process.env.MAIL_USER}>`,
  to,
  subject: 'Recuperación de contraseña - PetSync',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2F80ED; text-align: center;">Recuperación de contraseña</h2>
      <p>Hola,</p>
      <p>Has solicitado restablecer la contraseña de tu cuenta en <strong>PetSync</strong>.</p>
      <p>Por favor, haz clic en el siguiente botón para crear una nueva contraseña:</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" style="background-color: #2F80ED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Restablecer contraseña</a>
      </p>
      <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
      <p style="word-break: break-all;"><a href="${resetUrl}" style="color: #2F80ED;">${resetUrl}</a></p>
      <p><small>Este enlace expirará en 1 hora por motivos de seguridad.</small></p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">Si no solicitaste este cambio, puedes ignorar este correo sin problema.</p>
      <p style="font-size: 12px; color: #888;">© 2025 PetSync. Todos los derechos reservados.</p>
    </div>
  `,
})

}
