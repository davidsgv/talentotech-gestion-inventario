const nodemailer = require('nodemailer');

/**
 * Envía un correo electrónico con una plantilla HTML y datos dinámicos.
 * @param {string} htmlTemplate - Plantilla HTML del correo.
 * @param {Object} templateData - Datos para reemplazar en la plantilla.
 * @param {string} from - Dirección de correo del remitente.
 * @param {string} to - Dirección de correo del destinatario.
 * @param {string} bcc - Lista de correos en copia oculta.
 * @param {Object} smtpConfig - Configuración del servidor SMTP.
 * @param {string} smtpConfig.host - Host del servidor SMTP.
 * @param {number} smtpConfig.port - Puerto del servidor SMTP.
 * @param {boolean} smtpConfig.secure - Si la conexión SMTP es segura (TLS).
 * @param {string} smtpConfig.user - Usuario de autenticación SMTP.
 * @param {string} smtpConfig.pass - Contraseña de autenticación SMTP.
 * @returns {Promise} - Promesa que se resuelve cuando se envía el correo.
 */
async function sendEmail(htmlTemplate, templateData, from, to, bcc, smtpConfig) {
    // Crear el transportador de correo
    let transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure, // true para el puerto 465, false para otros puertos
        auth: {
            user: smtpConfig.user, // usuario SMTP
            pass: smtpConfig.pass  // contraseña SMTP
        }
    });

    // Reemplazar los datos en la plantilla HTML
    const htmlContent = replaceTemplateData(htmlTemplate, templateData);

    // Enviar el correo
    let info = await transporter.sendMail({
        from: from, // Remitente
        to: to, // Destinatarios
        bcc: bcc, // Copia oculta
        subject: templateData.subject || "Sin asunto", // Asunto del correo
        html: htmlContent, // Contenido HTML del correo
    });

    console.log("Message sent: %s", info.messageId);
}

/**
 * Reemplaza los datos dinámicos en la plantilla HTML.
 * @param {string} template - Plantilla HTML.
 * @param {Object} data - Datos para reemplazar en la plantilla.
 * @returns {string} - Plantilla con los datos reemplazados.
 */
function replaceTemplateData(template, data) {
    let result = template;
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, data[key]);
    }
    return result;
}

module.exports = sendEmail