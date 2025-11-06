// src/app/modules/user/user.interface.ts

export enum Role {
  ADMIN = "admin",
  REGISTRAR = "registrar",
  DPHEAD = "dphead",
  TEACHER = "teacher",
  STUDENT = "student",
  ACCOUNTANT = "accountant",
  LIBRARIAN = "librarian",
  WARDEN = "warden",
  PARENT = "parent",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  profilePhoto?: string;
  contact?: string;
  departmentId?: string;
  createdAt?: Date;
}
