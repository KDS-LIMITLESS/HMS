"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePDF = exports.uploadReportFile = exports.uploadPicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const http = require('http');
//const aws = require('aws-sdk')
//const { S3Client }= require('@aws-sdk/client-s3')
//const multers3 = require('multer-s3')
const s3 = new client_s3_1.S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIA5O3DTRVWAOXULS6L",
        secretAccessKey: "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",
    }
});
//s3.getObject({})
// image upload 
const uploadS3 = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, path_1.default.basename(file.originalname, path_1.default.extname(file.originalname))
                + '-' + Date.now() + path_1.default.extname(file.originalname));
        },
    }),
    limits: { fileSize: 2000000 }
}).single('image');
function uploadPicture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            uploadS3(req, res, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(200).send(`An error occured!`);
                }
                console.log(req.file.location);
                return res.status(200).json({ imgPath: req.file.location });
            });
        }
        catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });
}
exports.uploadPicture = uploadPicture;
// upload report file
const uploadReport = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
}).single('file');
function uploadReportFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            uploadReport(req, res, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(`An error occured!`);
                }
                // console.log(req.body)
                console.log(req.file.location);
                next();
            });
        }
        catch (e) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    });
}
exports.uploadReportFile = uploadReportFile;
function retrievePDF(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = yield req.body.date;
        const client = yield req.body.client;
        try {
            console.log(req.body);
            http.get(`http://rainforestpos.s3.amazonaws.com/${client}-${date}.pdf`, function (resp) {
                if (resp.statusCode === 200) {
                    console.log(resp.statusCode);
                    return res.status(200).json({ pdf: `https://rainforestpos.s3.amazonaws.com/${client}-${date}.pdf` });
                }
                return res.status(404).send(`Report not found!`);
            });
        }
        catch (e) {
            console.log(e.message);
            return res.status(404).send("Not Found");
        }
    });
}
exports.retrievePDF = retrievePDF;
