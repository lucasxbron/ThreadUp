import mongoose, { Schema, model } from "mongoose";
import validator from "validator";
import { hash } from "bcrypt-ts";
import { DEFAULT_ROLE, DEFAULT_PERMISSIONS } from "../utils/constants.js";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      validate: {
        validator: (v: string) => /^[a-zA-Z0-9_]+$/.test(v),
        message: "Username can only contain letters, numbers, and underscores",
      },
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
        message: (props: any) =>
          `The password is too weak! Must include at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.`,
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
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    pendingEmail: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return !v || validator.isEmail(v);
        },
        message: "Pending email is not valid",
      },
    },
    emailChangeToken: {
      type: String,
      default: "",
    },
    emailChangeTokenExpiry: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    passwordResetTokenExpiry: {
      type: Date,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.verificationToken;
  delete obj.emailChangeToken; // Don't expose change token
  delete obj.__v;
  return obj;
};

userSchema.pre("save", async function (next) {
  this.email = validator.trim(this.email);
  this.email =
    validator.normalizeEmail(this.email, {
      gmail_remove_dots: false,
    }) || this.email;

  // Normalize pending email if it exists
  if (this.isModified("pendingEmail") && this.pendingEmail) {
    this.pendingEmail = validator.trim(this.pendingEmail);
    this.pendingEmail =
      validator.normalizeEmail(this.pendingEmail, {
        gmail_remove_dots: false,
      }) || this.pendingEmail;
  }

  if (this.isModified("firstName")) {
    this.firstName = this.firstName.trim();
  }
  if (this.isModified("lastName")) {
    this.lastName = this.lastName.trim();
  }
  if (this.isModified("username")) {
    this.username = this.username.trim().toLowerCase();
  }

  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = model("User", userSchema);
export default User;
