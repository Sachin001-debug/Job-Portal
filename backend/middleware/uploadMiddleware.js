import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

//to accept imgs only
const  fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error("Not an image!"), false);
};

export const uploadMiddleware = multer({storage, fileFilter});

//this is for image 