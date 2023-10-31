import dotenv from "dotenv";
dotenv.config();

export const config = {
    server:{
        port:process.env.PORT,
        secretSession:process.env.SECRET_SESSION,
        persistence: process.env.PERSITENCE,
        appEnv: process.env.NODE_ENV || "development",
        secretToken: process.env.SECRET_TOKEN

    },
    mongo:{
        url:process.env.MONGO_URL
    },
    gmail:{
        marketingEmail:process.env.MARKETING_EMAIL,
        password:process.env.GMAIL_PASSWORD
    }
};