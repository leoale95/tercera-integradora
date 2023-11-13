// app.js
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import { __dirname } from "./utils.js";
import { initPassport } from "./config/passport.config.js";
import { config } from "./config/config.js";
import { logger } from "./utils/logger.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

const port = config.server.port;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

// Configuración de Handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

// Configuración de la sesión
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

// Configuración de Passport
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(port, () => logger.info(`Server listening on port ${port}`));

export { app };
