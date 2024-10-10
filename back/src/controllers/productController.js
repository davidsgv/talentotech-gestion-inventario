const Product = require("../models/product")
const History = require("../models/stockHistory")
const Category = require("../models/category")

exports.CreateProduct = async (req, res) => {
    try{
        let category = await Category.findOne({name: req.body.category})
        if(!category){
            category = new Category({name: req.body.category})
            await category.save()
        }
        console.log(category)

        const newProduct = new Product(req.body)
        newProduct.category = category._id;
        const newHistoryObj = {
            name: newProduct.name,
            description: newProduct.description,
            stock: newProduct.stock,
            category: req.body.category
        }
        const newHistory = new History(newHistoryObj);

        await newProduct.save()
        await newHistory.save()

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
