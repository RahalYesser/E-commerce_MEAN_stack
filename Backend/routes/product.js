let express = require("express");
let Product = require("../models/Product");

let router = express.Router();

//Add Product
router.post("/add", async(req, res)=>{
    try{
        let body=req.body
        let product = new Product();
        product.pcid = body.pcid;
        product.name = body.name;
        product.desc = body.desc;
        product.categories = body.categories;
        product.color = body.color;
        product.size = body.size;
        product.price = body.price;
        product.stock = body.stock;
        product.img=body.img;

        product.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"FAILED", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});


//Get All Products
router.get("/list", async(req, res)=>{
    try{ 
        let products = await Product.find();
        res.end(JSON.stringify({status:"success", data:products}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

//Get Products sort by price
router.get("/list-sort-by-price/:sort", async(req,res)=>{
    try{ 
        let products = await Product.find().sort({price:req.params.sort});

        console.log(products)
        res.end(JSON.stringify({status:"success", data:products}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

//Get Products sort by categories
router.get("/list-sort-by-categories/:category/:sort", async(req,res)=>{
    try{ 
        let category = req.params.category
        let sort = req.params.sort
        let filteredProduct=[]
        let products = await Product.find().sort({price:sort})

        for(let product of products){
            if(product.categories===category){
                filteredProduct.push(product)
            }
        }
    
        res.end(JSON.stringify({status:"success", data:filteredProduct}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

// Get Product By ID
router.get("/get/:id", async(req, res)=>{
    try{
        let product = await Product.findById(req.params.id);
        res.end(JSON.stringify({status:"success", data:product}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

// Update Product 
router.put("/update/:id",async(req,res)=>{
    try {
        let body = req.body;
        await Product.findByIdAndUpdate(req.params.id,{
            pcid : body.pcid,
            name : body.name,
            desc : body.desc,
            categories : body.categories,
            color : body.color,
            size : body.size,
            price : body.price,
            stock : body.stock,
            img : body.img,  
        });
        res.end(JSON.stringify({status:"success"}));
    } catch {
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
})

// Delete Product
router.delete("/delete/:id", async(req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.end(JSON.stringify({status:"success",data:req.params}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});





module.exports = router;

