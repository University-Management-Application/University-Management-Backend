import { Schema, model } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    role: {
      type: String,
      enum: Object.values(Role), // ✅ keeps it synced with enum automatically
      required: [true, "User role is required"],
      default: Role.STUDENT,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      trim: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // ✅ auto adds createdAt & updatedAt
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
