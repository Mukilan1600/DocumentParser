import fs from "fs";
import path from "path";
import multer from "multer";

import { IJwtPayload } from "../auth/Auth";

class FileManager {
  static UPLOADS_FOLDER = "./uploads";

  static Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const user = req.user as IJwtPayload;
      cb(null, path.join(FileManager.UPLOADS_FOLDER, user.id));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  static upload = multer({
    storage: FileManager.Storage,
  });

  static createFolder = (foldername: string) => {
    fs.mkdir(
      path.join(FileManager.UPLOADS_FOLDER, foldername),
      { recursive: true },
      (err) => {
        if (err) throw err;
      }
    );
  };

  static removeFile = (
    foldername: string,
    filename: string,
    callback: (err: any) => void
  ) => {
    fs.rm(
      path.resolve(FileManager.UPLOADS_FOLDER, foldername, filename),
      callback,
    );
  };
}

export default FileManager;
