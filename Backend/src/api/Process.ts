import passport from "passport";
import path from "path";
import { spawn } from "child_process";
import { Router } from "express";
import { IJwtPayload } from "../auth/Auth";

// Utility
const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const router = Router();

router.post(
  "/detect",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var dataToSend: string;
    const user = req.user as IJwtPayload;
    const python = spawn("python", [
      path.resolve("./ocr-src/ocr.py"),
      user.id,
      req.body.filename,
    ]);
    const start = process.hrtime();
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.on("close", (code) => {
      if (code > 0)
        return res.status(500).json({ msg: "Internal server error" });
      return res.json({
        time: getDurationInMilliseconds(start),
        msg: dataToSend,
      });
    });
  }
);

export default router;
