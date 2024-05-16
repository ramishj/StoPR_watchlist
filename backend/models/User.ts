import { Document, Schema, Model, model } from 'mongoose';

interface WatchlistItem {
  name: string;
  symbols: string[];
}

interface UserDocument extends Document {
  // Define the fields of your User document
  firstName: string;
  username: string;
  email: string;
  password: string;
  mobileNumber: string;
  country: string;
  watchlist: WatchlistItem[]; // Specify the type for watchlist
}

const userSchema = new Schema<UserDocument>({
  // Define the fields of your User schema
  firstName: String,
  username: String,
  email: String,
  password: String,
  mobileNumber: String,
  country: String,
  watchlist: { type: [{ name: String, symbols: [String] }], default: [{ name: null, symbols: [] }] }
});

const User = model<UserDocument>('User', userSchema);

export default User;
