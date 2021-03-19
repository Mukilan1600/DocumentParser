import { PassportStatic } from "passport";
import passportjwt, { JwtFromRequestFunction } from "passport-jwt";

import { CallbackError } from "mongoose";
import * as User from "../models/User";

const JWTStrategy = passportjwt.Strategy;

export interface IJwtPayload {
  id: string;
  username: string;
  name: string;
  files: [string];
}

const jwtExtractor: JwtFromRequestFunction = (req) => {
  return req.cookies.jwt ?? "";
};
export default (passport: PassportStatic) => {
  passport.use(
    "jwt",
    new JWTStrategy(
      { jwtFromRequest: jwtExtractor, secretOrKey: process.env.JWT_SECRET },
      (user: IJwtPayload, callback) => {
        User.default.findById(
          user.id,
          (err: CallbackError, doc: User.IUser) => {
            if (err) callback(err, null);
            else if (!doc) callback(null, false);
            else callback(null, user);
          }
        );
      }
    )
  );
};
