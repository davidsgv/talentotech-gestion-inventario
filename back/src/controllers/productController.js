const Producto = require("../models/product")
const History = require("../models/stockHistory")
const Category = require("../models/category")

exports.CreateProduct = async (req, res) => {
    // try{
    //     let category = await Category.findOne({name: req.body.category})
    //     if(!category){
    //         category = new Category({name: req.body.category})
    //     }
    //     console.log(category)

    //     const newProduct = new Producto(req.body)
    //     newProduct.category = category._id;
    //     const newHistoryObj = {
    //         name: newProduct.name,
    //         description: newProduct.description,
    //         stock: newProduct.stock
    //     }
    //     const newHistory = new History(newHistoryObj);

    //     await newProduct.save()
    //     await newHistory.save()

    //     res.status(201).json(newProduct)
    // } catch (error){
    //     res.status(500).json({error: error.message})
    // }

    res.status(201).json({message: "new product"})
}