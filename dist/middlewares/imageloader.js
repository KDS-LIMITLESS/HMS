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
const aws = require('@aws-sdk/client-s3');
const multers3 = require('multer-s3');
const storage = multer_1.default.diskStorage({
    destination: `uploads`,
    filename: function (req, file, cb) {
        cb(null, path_1.default.basename(file.originalname, path_1.default.extname(file.originalname))
            + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const s3 = new aws.S3({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "AKIA5O3DTRVWAOXULS6L",
        secretAccessKey: "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",
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 }
}).single('image');
const uploadS3 = (0, multer_1.default)({
    storage: multers3({
        s3: s3,
        bucket: 'rainforestpos',
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, path_1.default.basename(file.originalname, path_1.default.extname(file.originalname))
                + '-' + Date.now() + path_1.default.extname(file.originalname));
        },
    })
}).single('image');
function uploadPicture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadS3(req, res, (err) => {
            var _a;
            if (err) {
                console.log(err);
                return res.status(200).send(`An error occured!`);
            }
            console.log(req);
            return res.status(200).json({ imgPath: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename });
        });
    });
}
exports.uploadPicture = uploadPicture;
