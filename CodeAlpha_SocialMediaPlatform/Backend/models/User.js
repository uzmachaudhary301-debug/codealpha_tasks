import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password configuration is required'],
      minlength: [6, 'Password must be at least 6 characters']
    }
  },
  {
    timestamps: true // Yeh auto-generate karega createdAt aur updatedAt details database mein
  }
);

const User = mongoose.model('User', userSchema);
export default User;