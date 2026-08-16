import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_Email ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true,token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogAdmin = async (req, res) => {
  try {
    const blog = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlog = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comment = await Comment.countDocuments();
    const draft = await Blog.countDocuments({ isPublished: false });

    const dashboard = {
      blogs,
      comment,
      draft,
      recentBlog,
    };

    res.json({ success : true, dashboard });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deletedCommentById = async (req,res) => {
  try {
    const {id} = req.body
    await Comment.findByIdAndDelete(id)
    res.json({success:true , message : "Comment Deleted SuccessFully"})
  } catch (error) {
    res.json({success:false , message:error.message})
  }
}

export const approvedCommentById = async (req,res) => {
  try {
    const {id} = req.body
    await Comment.findByIdAndUpdate(id , {isApproved : true})
    res.json({success:true , message : "Comment Approved SuccessFully"})
  } catch (error) {
    res.json({success:false , message:error.message})
  }
}