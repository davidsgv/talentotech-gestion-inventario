const express = require("express");
const mongoose = require("mongoose");
const path = require("path").resolve(__dirname, '../../.env');
require("dotenv").config({ path: path });

const productoRouter = require("./routes/product")
const authRouter = require("./routes/auth");


const app = express();
app.use(express.json());

app.use("/api/producto/", productoRouter);
app.use("/api/auth/", authRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Base de datos conectada"))
    .catch(err => console.error("No se pudo conectar a Mongo: ", err));


module.exports = app;