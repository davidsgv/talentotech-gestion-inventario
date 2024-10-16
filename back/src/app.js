const express = require("express");
const mongoose = require("mongoose");
const path = require("path").resolve(__dirname, '../../.env');
const cors = require('cors');
require("dotenv").config({ path: path });

// Inicializa express primero
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
const authMiddleware = require("./middlewares/authMiddleware")

// Rutas
const productoRouter = require("./routes/product");
const authRouter = require("./routes/auth");

app.use("/api/auth/", authRouter);
app.use("/api/producto/", authMiddleware(), productoRouter);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Base de datos conectada"))
    .catch(err => console.error("No se pudo conectar a Mongo:", err));

module.exports = app;
