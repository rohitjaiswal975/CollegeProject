import fs from "fs";
import imageKit from "../Configs/imagekit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    // Check if all field are present
    if (
      !title ||
      !subtitle ||
      !category ||
      !description ||
      !category ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const filebuffer = fs.readFileSync(imageFile.path);

    // Upload image to imagekit
    const response = await imageKit.upload({
      file: filebuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto commpression
        { format: "webp" }, // Convert to mordern format
        { width: "1280" }, // Width resizing
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image,
    });

    res.json({ success: true, message: "Blog Added SuccessFull" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
