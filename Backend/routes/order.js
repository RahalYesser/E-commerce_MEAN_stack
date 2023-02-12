const router = require("express").Router();
const Order = require("../models/Order")

//confirm
router.post("/confirm", async(req, res)=>{
    try{
        let body =req.body
        let order = new Order();
        order.userId = body.userId;
        order.fname = body.fname;
        order.lname = body.lname;
        order.adress= body.adress;
        order.phone = body.phone;
        order.email = body.email;
        order.products= body.products;
        order.amount = body.amount;

        order.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"FAILED", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});


//Get All Orders
router.get("/list", async(req, res)=>{
    try{ 
        let orders = await Order.find();
        res.end(JSON.stringify({status:"success", data:orders}));
    }
    catch{
        res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
    }
});

module.exports = router