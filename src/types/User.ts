

import { Types } from "mongoose"

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: "ARTIST" | "USER" | "ADMIN";
  phone?: string;
  location?: {
    city?: string;
    state?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}