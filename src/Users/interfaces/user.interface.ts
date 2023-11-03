import { Document } from "mongoose";

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly role: string;
}

// export interface Country extends Document {
//   readonly name: string;
//   readonly capital: string;
//   readonly officialLanguage: string;
//   readonly numberOfInhabitants: number;
//   readonly numberOfCities: number;
// }