const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();

const productoRouter = require("./routes/product")


const app = express();
app.use(express.json());

app.use("/api/producto/", productoRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Base de datos conectada"))
    .catch(err => console.error("No se pudo conectar a Mongo: ", err));


module.exports = app;