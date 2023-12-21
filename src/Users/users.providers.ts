import { Mongoose } from "mongoose";
import { UserSchema } from "./schemas/user.schema";

export const userProviders = [
  {
    provide: "user",
    useFactory: (mongoose: Mongoose) => mongoose.model("user", UserSchema),
    inject: ["DATABASE_CONNECTION"],
  }
]