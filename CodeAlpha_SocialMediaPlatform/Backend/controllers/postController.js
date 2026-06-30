import Post from '../models/Post.js';

// 1. Create a New Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content.trim()) {
      return res.status(400).json({ message: "❌ Post content cannot be empty!" });
    }

    const newPost = await Post.create({
      user: req.user._id,
      username: req.user.username, // Middleware se user data liya
      content
    });

    res.status(201).json({ message: "📝 Post created successfully!", post: newPost });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// 2. Get All Posts (Home Feed)
export const getAllPosts = async (req, res) => {
  try {
    // Newest posts top par show karne ke liye sort(-1) lagaya
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// 3. Like / Unlike Post Toggle
export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "❌ Post not found!" });
    }

    // Check agar user ne pehle se like kiya hua hai
    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      // Agar pehle se liked hai, to array se ID nikal do (Unlike)
      post.likes = post.likes.filter((userId) => userId.toString() !== req.user._id.toString());
      await post.save();
      return res.status(200).json({ message: "👎 Post unliked successfully", likesCount: post.likes.length });
    } else {
      // Agar liked nahi hai, to user ID add kar do (Like)
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({ message: "👍 Post liked successfully", likesCount: post.likes.length });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};