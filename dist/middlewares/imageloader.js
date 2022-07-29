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
exports.uploadPicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const { S3Client } = require('@aws-sdk/client-s3');
const multers3 = require('multer-s3');
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIA5O3DTRVWAOXULS6L",
        secretAccessKey: "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",
    }
});
const uploadS3 = (0, multer_1.default)({
    storage: multers3({
        s3: s3,
        bucket: 'rainforestpos',
        acl: 'public-read',
        contentType: multers3.AUTO_CONTENT_TYPE,
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
