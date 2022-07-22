import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const onSave = async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
};

const generateAuthToken = async function () {
  const options = {
    expiresIn: "7d",
  };

  const token = await jsonwebtoken.sign(
    { _id: this._id },
    process.env.SECRET_KEY,
    options
  );

  this.token = token;
  await this.save();
};

const comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

UserSchema.pre("save", onSave);

UserSchema.methods.generateAuthToken = generateAuthToken;
UserSchema.methods.comparePassword = comparePassword;
UserSchema.statics.findByCredentials = findByCredentials;

const User = mongoose.model("User", UserSchema);

export default User;
