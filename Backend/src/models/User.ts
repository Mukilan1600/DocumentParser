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

export const comparePassword = async (
  hash: string,
  password: string,
  callback?: (err: CallbackError, isMatch: boolean) => void
) => {
  try {
    bcrypt.compare(password, hash, callback);
  } catch (err) {
    throw err;
  }
};

export const getFiles = async (id: string): Promise<string[]> => {
  try {
    const doc = await User.findById(id);
    return doc.files;
  } catch (err) {
    throw err;
  }
};

export const findAndAddFile = async (id: string, filename: string) => {
  try {
    await User.findOneAndUpdate(
      { _id: id, files: { $ne: filename } },
      { $push: { files: filename } },
      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    throw err;
  }
};

export const findAndRemoveFile = async (id: string, filename: string) => {
  try {
    await User.findByIdAndUpdate(id, { $pullAll: { files: [filename] } });
  } catch (err) {
    throw err;
  }
};
