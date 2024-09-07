import Post from "../models/Post.js";
import User from "../models/User.js";
import express from 'express';


//CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
        
    } catch (error) {
        res.status(409).json({message: err.message});
    }
}


// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(201).json(post);
 

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({ userId });
        res.status(201).json(post);

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}


// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(404).json({message: err.message});
    }
}

// DELETE


const router = express.Router();

// Delete a post by its ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the post by its ID
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

export default router;