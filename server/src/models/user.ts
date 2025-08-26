import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import { hash } from "bcrypt-ts";
import { DEFAULT_ROLE, DEFAULT_PERMISSIONS } from "../utils/constants.js";

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: (props: any) => `${props.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) =>
        validator.isStrongPassword(v, {
          minLength: 8,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
          minLowercase: 1,
        }),
      message: (props: any) => `The password is too weak! Must include at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.`,
    },
  },
  roles: {
    type: [String],
    default: DEFAULT_ROLE,
  },
  permissions: {
    type: [String],
    default: DEFAULT_PERMISSIONS,
  },
}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

userSchema.pre("save", async function (next) {
  this.email = validator.trim(this.email);
  this.email = validator.normalizeEmail(this.email, {
    gmail_remove_dots: false,
  }) || this.email;

  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = model("User", userSchema);
export default User;