const router = require("express").Router();

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

module.exports = router