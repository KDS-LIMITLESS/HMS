import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const aws = require('aws-sdk')
const { S3Client }= require('@aws-sdk/client-s3')
const multers3 = require('multer-s3')


const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIA5O3DTRVWAOXULS6L",
        secretAccessKey: "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",
    }
});

// image upload 
const uploadS3  = multer({
    storage: multers3({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multers3.AUTO_CONTENT_TYPE,
        
        metadata: function (req: Request, file:any, cb: any) {
          cb(null, {fieldname: file.fieldname});
        },
        
        key: function (req:Request, file:any, cb:any) {
          cb(null, path.basename(file.originalname, path.extname(file.originalname)) 
          + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    limits: {fileSize: 2000000}
}).single('image')

export async function uploadPicture(req: any, res: Response) {
    try {
        uploadS3(req, res, (err) =>{
            if (err) {
                console.log(err);
                return res.status(200).send(`An error occured!`)
            }
            console.log(req.file.location);
            return res.status(200).json({imgPath: req.file.location})
        })
    } catch (e: any) {
        console.log(e.message)
        res.status(400).send(e.message)
    }   
}

// upload report file

export async function uploads(req:Request, res: Response) {
   
    
}

const uploadReport = multer({
    storage: multers3({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        contentType: multers3.AUTO_CONTENT_TYPE,

        metadata: function (req: Request, file:any, cb: any) {
            cb(null, {fieldname: file.fieldname});
          },  

        key: function(req:Request, file:any, cb:any){
            cb(null, file.originalname);
        }
    })
}).single('file')

export async function uploadReportFile(req:any, res:Response) {
    try {
        uploadReport(req, res, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send(`An error occured!`)
            }
            console.log(req.body)
            console.log(req.file.location);
            return res.status(200).json({filepath: req.file.location})
        })
    } catch (e: any) {
        console.log(e.message)
        res.status(400).send(e.message)
    }
}