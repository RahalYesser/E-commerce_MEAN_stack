

let express = require("express");
let bodyparser = require("body-parser");
let Product = require("../models/Product");
let fs = require("fs");

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
        // let base64image = body.img;
        // if(base64image != "")
        // {
        //     let randomname = (Math.random() + 1).toString(36).substring(7);
        //     base64image = base64image.replace(/^data:image\*;base64,/, "");
        //     product.imagepath = "products/" + randomname + ".png";
        //     fs.writeFile("assets/" + product.imagepath, base64image, 'base64', function(err){
        //         if(err)
        //             console.log("Error while saving image " + err);
        //     });
        // }
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

// Get Product By ID
router.get("/get/:id", async(req, res)=>{
    try{
        let body = req.body;
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
        let body=req.params;
        await Product.findByIdAndDelete(req.params.id);
        res.end(JSON.stringify({status:"success",data:req.params}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

router.post("/savevariety", async(req, res)=>{
    try{
        let body = req.body;
        let product = new Product();
        product = await Product.findById(body.id);
        product.varieties.push(body.variety);
        product.save().then(result=>{
            res.send(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.send(JSON.stringify({status:"FAILED", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));        
    }
});
router.post("/deletevariety", async(req, res)=>{
    try{
        let body = req.body;
        let product = new Product();
        product = await Product.findById(body.id);
        let varieties = [];
        for(let i = 0; i < product.varieties.length; i++)
        {
            if(product.varieties[i].color != body.variety.color || product.varieties[i].size != body.variety.size)
            {
                varieties.push(product.varieties[i]);
            }
        }
        product.varieties = varieties;
        product.save().then(result=>{
            res.send(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.send(JSON.stringify({status:"FAILED", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));        
    }
});

module.exports = router;

