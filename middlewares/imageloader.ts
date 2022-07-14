import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const { S3Client }= require('@aws-sdk/client-s3')
const multers3 = require('multer-s3')

// const storage = multer.diskStorage({
//     destination: `uploads`,
//     filename: function (req, file, cb){
//         cb(null, path.basename(file.originalname, path.extname(file.originalname)) 
//         + '-' + Date.now() + path.extname(file.originalname));
//     }
// });


const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIA5O3DTRVWAOXULS6L",
        secretAccessKey: "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",
    }
});

const uploadS3  = multer({
    storage: multers3({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        contentType: multers3.AUTO_CONTENT_TYPE,
        metadata: function (req: Request, file:any, cb: any) {
          cb(null, {fieldname: file.fieldname});
        },
        key: function (req:Request, file:any, cb:any) {
          cb(null, path.basename(file.originalname, path.extname(file.originalname)) 
          + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    limits: {fileSize: 1000000}
}).single('image')

export async function uploadPicture(req: any, res: Response) {
    uploadS3(req, res, (err) =>{
        if (err) {
            console.log(err);
            return res.status(200).send(`An error occured!`)
        }
        console.log(req.file.location);
        // res.setHeader('content-type', 'image/jpeg')
        return res.status(200).json({imgPath: req.file.location})
    })
}