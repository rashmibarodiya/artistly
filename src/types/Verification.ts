import { Types } from "mongoose";

export interface IVerification {
  _id?: Types.ObjectId;
  artistId: Types.ObjectId;
  documents: string[];
  status: "PENDING" | "VERIFIED" | "REJECTED";
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
}