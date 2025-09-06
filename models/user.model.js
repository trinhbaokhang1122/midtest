import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String },
  apiKeyExpiresAt: { type: Date }
});

const userModel = mongoose.model('users', userSchema);
export default userModel