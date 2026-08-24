import fs from "fs";
import imageKit from "../Configs/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

// Add blog
export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    // Check if all field are present
    if (!title || !subtitle || !category || !description || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const filebuffer = fs.readFileSync(imageFile.path);

    const fileBase64 = filebuffer.toString("base64");

    // Upload image to imagekit
    const response = await imageKit.files.upload({
      file: fileBase64,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation

    const optimizedImageUrl = imageKit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        {
          quality: "auto",
          format: "webp",
          width: 1280,
        },
      ],
    });

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });

    res.json({ success: true, message: "Blog Added SuccessFull" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get blog

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogId = async (req, res) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comment merge with blog
    await Comment.deleteMany({blog : id}) 
    
    res.json({ success: true, message: "deleted succesfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Comment Controller
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });
    res.json({ success: true, message: "Comment Added for Review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComment = async (req, res) => {
  try {
    const { blogid } = req.body;
    const comments = await Comment.find({
      blog: blogid,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



