import { Router } from "express";
import JWT from "jsonwebtoken";
import passport from "passport";
import FileManager from "../filemanager/FileManager";
import * as User from "../models/User";

const router = Router();

router.post("/register", (req, res) => {
  const newUser: User.IUser = new User.default({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  User.findByUsername(newUser.username, (err, doc) => {
    if (doc) return res.json({ msg: "Username already exists" });
    User.addUser(newUser, (err) => {
      if (err) return res.status(500).json({ msg: "Internal server error" });
      FileManager.createFolder(newUser.id)
      return res.json({ msg: "User register successfully" });
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByUsername(username, (err, doc) => {
    if (err) return res.status(500).json({ msg: "Internal server error" });
    if (!doc) return res.json({ msg: "Invalid username / password" });
    User.comparePassword(doc.password, password, (err, isMatch) => {
      if (err) return res.status(500).json({ msg: "Internal server error" });
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
        return res.json({ token, user, msg: "Log in successful" });
      } else {
        return res.json({ msg: "Invalid username/password" });
      }
    });
  });
});

router.post('/authenticate', passport.authenticate("jwt", {session: false}), (req,res) => {
  return res.json(req.user)
})

export default router;
