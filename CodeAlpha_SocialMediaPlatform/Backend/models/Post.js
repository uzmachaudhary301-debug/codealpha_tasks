import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // User model ke sath connection relation
    },
    username: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: [true, 'Post content cannot be empty']
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Jin users ne like kiya unki IDs ka array
      }
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);
export default Post;