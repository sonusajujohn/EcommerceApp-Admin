import adminModel from "../model/adminModel";
import fs from 'fs'
import path from 'path';

//add med item

const addadmin=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const admin=new adminModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await admin.save();
        res.json({success:true,message:"Medicine Successfully Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

    
}

//add med list
const listadmin=async (req,res)=>{
    try {
      const meds=await medModel.find({});
      res.json({success:true,data:meds})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:'Error'})
    }
}

//remove med item

const deleteadmin=async (req,res)=>{
    try {
        const admin=await adminModel.findById(req.body.id);
        fs.unlink(`uploads/${med.image}`,()=>{});

        await adminModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'med removed'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'});
    }
}



export {addadmin,listadmin,deleteadmin};