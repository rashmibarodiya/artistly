
import {model,Schema,models}from "mongoose"
import { IUser } from "../../types/User"

const userSchema = new Schema<IUser>( {
 name:{
    type:String,
    required:true
 },email:{
    type:String,
    required:true,
    unique:true
 },password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ARTIST", "USER", "ADMIN"],
      default: "USER",
    },
    phone: {
      type: String,
    },
    location: {
      city: String,
      state: String,
    },
},{
    timestamps:true,
})

export const User = models.User||model<IUser>("User",userSchema);
