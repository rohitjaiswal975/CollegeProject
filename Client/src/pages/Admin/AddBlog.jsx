import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContex";
import toast from "react-hot-toast";
import {parse} from "marked"

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { axios } = useAppContext();

  const [image, setImage] = useState(false);
  const [title, setTile] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if(!title) return toast.error("Please Enter a Title")

      try {
        setLoading(true)
        const {data} = await axios.post("/api/blog/generate", {prompt : title})
        if(data.success) {
          quillRef.current.root.innerHTML = parse(data.content)
        }else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }finally {
        setLoading(false)
      }
  };

  const onSubmitHandeler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title,
        subtitle,
        description: quillRef.current.root.innerHTML,
        isPublished,
        category,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);
      if (data.success) {
        toast.success(data.message);
        setTile("")
        setSubTitle("")
        setImage(false)
        quillRef.current.root.innerHTML = ""
        setCategory("Startup")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false)
    }
  };

  useEffect(() => {
    // Initiate Quill once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandeler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Image */}
        <p className="font-extrabold text-black">Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        {/* Blog Title */}
        <p className="mt-4 font-extrabold text-black">Blog Title</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          value={title}
          onChange={(e) => setTile(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-400 outline-none rounded"
        />
        {/* Blog Subtitle */}
        <p className="mt-4 font-extrabold text-black ">Blog SubTitle</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-400 outline-none rounded"
        />
        {/* Blog Description */}
        <p className="mt-4 font-extrabold text-black ">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:p-10 pt-2 relative">
          <div ref={editorRef}></div>
          {/* Loding Animations */}
          {
            loading && (
                <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
                  <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                </div>
            )
          }
          <button
            type="button"
            disabled={loading }
            onClick={generateContent}
            className="absolute bottom-2 right-12 ml-2 text-sm text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4 font-extrabold text-black ">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-4 mt-4">
          <p className="font-extrabold text-black ">Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer accent-green-600 "
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding...." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
