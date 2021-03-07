import fs from "fs";
import path from "path";

class FileManager {
  static UPLOADS_FOLDER = "./uploads";

  static createFolder = (foldername: string) => {
    fs.mkdir(
      path.join(FileManager.UPLOADS_FOLDER, foldername),
      { recursive: true },
      () => {}
    );
  };
}

export default FileManager;
