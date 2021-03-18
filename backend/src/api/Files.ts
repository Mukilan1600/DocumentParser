import passport from "passport";
import path from "path";
import { Router } from "express";
import FileManager from "../filemanager/FileManager";
import { IJwtPayload } from "../auth/Auth";
import * as User from "../models/User";

const router = Router();

router.get(
  "/getfiles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user as IJwtPayload;
      const files = await User.getFiles(user.id);
      return res.json({ files });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
);

router.post(
  "/addfile",
  passport.authenticate("jwt", { session: false }),
  FileManager.upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ msg: "No file" });
    }
    const user = req.user as IJwtPayload;
    try {
      await User.findAndAddFile(user.id, req.file.filename);
      return res.json({ msg: "File upload successful" });
    } catch (err) {
      if (err) return res.status(500).json({ msg: "Internal server error" });
    }
  }
);

router.post(
  "/removefile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.filename)
      return res.status(400).json({ msg: "Invalid / No File" });
    const user = req.user as IJwtPayload;
    FileManager.removeFile(user.id, req.body.filename, () => {
      User.findAndRemoveFile(user.id, req.body.filename);
      return res.json({ msg: "File removed" });
    });
  }
);

router.post(
  "/getfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.filename)
      return res.status(400).json({ msg: "Invalid or no filename" });
    const user = req.user as IJwtPayload;
    return res.sendFile(
      path.resolve(FileManager.UPLOADS_FOLDER, user.id, req.body.filename),
      (err) => {
        if (err) return res.status(404).json({ msg: "File not found" });
      }
    );
  }
);

export default router;
