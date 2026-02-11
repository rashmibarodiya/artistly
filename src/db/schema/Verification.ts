import { Schema, model, models } from "mongoose";
import { IVerification } from "../../types/Verification";

const VerificationSchema = new Schema<IVerification>({
  artistId: { type: Schema.Types.ObjectId, ref: "ArtistProfile", required: true },
  documents: { type: [String], required: true },
  status: {
    type: String,
    enum: ["PENDING", "VERIFIED", "REJECTED"],
    default: "PENDING",
  },
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
  reviewedAt: Date,
});

export const Verification =
  models.Verification ||
  model<IVerification>("Verification", VerificationSchema);