import { Router } from "express";
import JWT from "jsonwebtoken";
import passport from "passport";
import { IJwtPayload } from "../auth/Auth";
import FileManager from "../filemanager/FileManager";
import * as User from "../models/User";

const router = Router();

router.post("/register", (req, res) => {
  const newUser: User.IUser = new User.default({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  User.findByUsername(newUser.username, (_err, doc) => {
    if (doc) return res.status(409).json({ msg: "Username already exists" });
    User.addUser(newUser, (err) => {
      if (err) return res.status(500).json({ msg: "Internal server error" });
      FileManager.createFolder(newUser.id);
      return res.json({ msg: "User register successfully" });
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByUsername(username, (err, doc) => {
    if (err) return res.status(500).json({ msg: "Internal server error" });
    if (!doc)
      return res.status(401).json({ msg: "Invalid username / password" });
    User.comparePassword(doc.password, password, (passwordErr, isMatch) => {
      if (passwordErr)
        return res.status(500).json({ msg: "Internal server error" });
      if (isMatch) {
        const user = {
          id: doc._id,
          username: doc.username,
          name: doc.name,
          files: doc.files,
        };
        const token = JWT.sign(user, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.cookie("jwt", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return res.json({ user, msg: "Log in successful" });
      } else {
        return res.status(401).json({ msg: "Invalid username/password" });
      }
    });
  });
});

router.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user) {
      const JWTUser = req.user as IJwtPayload;
      User.findByUsername(JWTUser.username, (err, user) => {
        if (err) return res.status(500).json({ msg: "Interal server error" });
        return res.json({
          id: user._id,
          username: user.username,
          name: user.name,
          files: user.files,
        });
      });
    }
  }
);

router.get("/logout", (req, res) => {
  return res.clearCookie("jwt").json({ msg: "Logout successful" });
});

export default router;
