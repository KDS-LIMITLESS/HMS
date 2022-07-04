import express from 'express';
import { Response, Request, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb){
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) 
        + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image')

export async function uploadPicture(req: Request, res: Response) {
    upload(req, res, (err) =>{
        if (err) {
            console.log(err);
            return res.status(200).send(`An error occured!`)
        }
        console.log(req.file);
        return res.status(200).json({imgPath: req.file?.filename})
    })
}