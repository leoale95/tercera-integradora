import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//Función que genera el token para el enlace
export const generateEmailToken = (email, expireTime) => {
	const token = jwt.sign({ email }, config.server.secretToken, {
		expiresIn: expireTime,
	});
	return token;
};

//Transporte de nodemailer correo con gmail
const transporter = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: config.gmail.marketingEmail,
		pass: config.gmail.password,
	},
	secure: false,
	tls: {
		rejectUnauthorized: false,
	},
});

//Función para enviar corre de recuperación de contraseña
export const sendRecoveryEmail = async (email, token) => {
	//generar link con el token y el tiempo de expiración
	const link = `http://localhost:8080/reset-password?token=${token}`;

	//enviar correo
	await transporter.sendMail({
		//estructura del correo electronico
		from: "Ecommerce Samir",
		to: email,
		subject: "Restablecer contraseña",
		html: `
            <div>
                <h2>Hola, estas restableciendo tu contraseña</h2>
                <p>Da clic para restablecer tu contraseña</p>
                <a href="${link}">
                    <button> Restablecer mi contraseña </button>
                </a>
            </div>
        `,
	});
};
