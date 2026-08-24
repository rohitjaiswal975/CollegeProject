import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogByID,
  genrateContent,
  getAllBlogs,
  getBlogComment,
  getBlogId,
  togglePublish,
} from "../controllers/BlogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/Auth.js";

const blogRoute = express.Router();

blogRoute.post("/add", upload.single("image"), auth, addBlog);

blogRoute.get("/all", getAllBlogs);
blogRoute.get("/:blogid", getBlogId);
blogRoute.post("/delete", auth, deleteBlogByID);
blogRoute.post("/toggle-publish", auth, togglePublish);

// Comment route
blogRoute.post("/add-comment", addComment);
blogRoute.post("/comments", getBlogComment); 

blogRoute.post("/generate" , auth , genrateContent)

export default blogRoute;
