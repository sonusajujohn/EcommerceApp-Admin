const productModel=require('../model/productModel')


//GET OPERATION

const listproduct = async (req,res)=>{
    try {
        const data= await productModel.find();
        res.status(200).send(data);
        
    } catch (error) {
        res.status(404).send("DATA NOT FOUND");
    }
}


//POST OPERATION 

const addproduct = async (req,res)=>{
    try {
        var item=req.body;
        const data=new productModel(item);
        const savedata=await data.save();
        res.status(200).send("POST OPERATION SUCCESSFULL");
    } catch (error) {
        res.status(404).send(error); 
    }
}


// PUT OPERATION

const updateproduct = async (req,res)=>{
    try {
        const id=req.params.id;
        const data=await productModel.findByIdAndUpdate(id,req.body);
        res.status(200).send("UPDATE OPERATION SUCCESSFULLY DONE")    
    } catch (error) {
        res.status(404).send(error);
    }
}


// DELETE OPERATION

const deleteproduct = async (req,res)=>{
    try {
         const id=req.params.id;
         const data= await productModel.findByIdAndDelete(id);
         res.status(200).send("DELETE OPERATION DONE SUCCESSFULLY");
    } catch (error) {
         res.status(404).send("DELETE OPERATION FAILED")
    }
}


module.exports= {listproduct,addproduct,updateproduct,deleteproduct};