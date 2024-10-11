const Product = require("../models/product")
const History = require("../models/stockHistory")
const Category = require("../models/category")
const sendMail = require("../helper/mail")

//const htmlPath = require("path").join(process.env.HTML_FOLDER, "stock.html");
//const fs = require('fs').promises;


exports.CreateProduct = async (req, res) => {
    try{
        let category = await getCategory(req.body.category);

        req.body.category = category._id
        const newProduct = new Product(req.body)
        //newProduct.category = category._id;
        await newProduct.save()

        updateHistory(newProduct);

        res.status(201).json(newProduct)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

exports.GetProducts = async (req, res) =>{
    try{
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.GetProductById = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id).populate("category");
        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.GetProductHistoryById = async (req, res)=>{
    try{
        const history = await History.find({productId: req.params.id}).populate("category");
        if(!history){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.status(200).json(history);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

exports.UpdateProduct = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        
        if(req.body.name) product.name = req.body.name;
        if(req.body.description) product.description = req.body.description;
        if(req.body.stock) product.stock = req.body.stock;
        if(req.body.stock_alert) product.stock_alert = req.body.stock_alert;
        if(req.body.category) product.category = await getCategory(req.body.category);
        product.save();
        
        updateHistory(product);
        checkStock(product);
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.DeleteProduct = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        
        if(product.stock == 0){
            Product.findByIdAndDelete(req.params.id, req.body, {new:true});
        }else{
            product.stock--
            product.save();
            updateHistory(product);
            checkStock(product);
        }
    
        res.status(200).json({message: "Producto eliminado"});
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

async function getCategory(category){
    let createdCategory = await Category.findOne({name: category})
    if(!createdCategory){
        createdCategory = new Category({name: category})
        await createdCategory.save()
    }

    return createdCategory._id;
}

async function updateHistory(product){
    const newHistoryObj = {
        productId: product._id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        category: product.category
    }

    let history = await History.findOne(newHistoryObj)
    if(!history){
        const newHistory = new History(newHistoryObj);
        await newHistory.save()
    }
}

async function checkStock(product){
    if(product.stock <= product.stock_alert){
        const htmlTemplate = await fs.readFile(htmlPath, 'utf8');

        const templateData = {
            product: product.name,
            stock: product.stock,
            subject: "Aviso de inventario"
        };

        const smtpConfig = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE == "true", // Usar TLS
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        };
        sendMail(htmlTemplate, templateData, smtpConfig.user, "davidsgv.98@gmail.com", null, smtpConfig);
    }
}