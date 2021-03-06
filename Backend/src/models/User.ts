import { model, Model, Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  name?: string;
  files?: [string];
}

type DocumentCallback = (err: CallbackError, doc: IUser) => void;

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  files: {
    type: [{ type: String }],
    default: [],
  },
});

const User: Model<IUser> = model<IUser>("user", userSchema);

export default User;

export const addUser = async (newUser: IUser, callback?: DocumentCallback) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    newUser.save(callback);
  } catch (err) {
    callback(err, null);
    throw err;
  }
};

export const findByUsername = async (
  username: string,
  callback?: DocumentCallback
) => {
  try {
    await User.findOne({ username }, callback);
  } catch (err) {
    throw err;
  }
};
