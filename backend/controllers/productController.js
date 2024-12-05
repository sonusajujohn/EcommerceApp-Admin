import medModel from "../model/adminModel";
import fs from 'fs'
import path from 'path';

//add med item

const addProduct=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const product=new medModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await product.save();
        res.json({success:true,message:"Medicine Successfully Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

    
}

//add med list
const listMed=async (req,res)=>{
    try {
      const meds=await medModel.find({});
      res.json({success:true,data:meds})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:'Error'})
    }
}

//remove med item

const removemed=async (req,res)=>{
    try {
        const product=await medModel.findById(req.body.id);
        fs.unlink(`uploads/${med.image}`,()=>{});

        await medModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'med removed'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'});
    }
}



export {addMed,listMed,removemed};