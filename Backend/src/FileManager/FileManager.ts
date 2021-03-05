import fs from "fs";
import path from "path";

class FileManager {
  static UPLOADS_FOLDER = "./uploads";

  static createFolder = () => {
    fs.mkdir(
      path.join(FileManager.UPLOADS_FOLDER, "121"),
      { recursive: true },
      () => {}
    );
  };
}

export default FileManager;
