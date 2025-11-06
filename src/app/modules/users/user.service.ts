import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { User } from "./user.model";

// Create user
const createUser = async (payload: IUser) => {
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(payload.passwordHash, 10);
  payload.passwordHash = hashedPassword;

  const user = await User.create(payload);
  return user;
};

// Get all users
const getAllUsers = async () => {
  const users = await User.find({}, { passwordHash: 0 }); // exclude password
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

// Get single user
const singleUser = async (id: string) => {
  const result = await User.findById(id, { passwordHash: 0 });
  return result;
};

// Update single user
const singleUserUpdate = async (id: string, payload: Partial<IUser>) => {
  // If password is being updated, hash it again
  if (payload.passwordHash) {
    payload.passwordHash = await bcrypt.hash(payload.passwordHash, 10);
  }

  const result = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
  return result;
};

// Delete single user
const singleUserDelete = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  singleUser,
  singleUserUpdate,
  singleUserDelete,
};
