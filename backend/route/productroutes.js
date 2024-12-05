import express from 'express'
import { addproduct,listproduct,deleteproduct } from '../controllers/medcontroller.js';
import multer from 'multer';

const productRouter=express.Router();

//Image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload=multer({storage:storage})

productRouter.post('/add',upload.single('image'),addproduct);
productRouter.get('/list',listproduct)
productRouter.delete('/remove',deleteproduct);

export default productRouter;