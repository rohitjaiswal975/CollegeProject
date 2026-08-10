import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTile] = useState("");
  const [subTiltle, setSubTitle] = useState("");
  const [category, setCategory] = useState("StartUp");
  const [isPublised, setIsPublised] = useState(false);

  const generateContent = async () => {};

  const onSubmitHandeler = (e) => {
    e.prventDefault();
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
          value={subTiltle}
          onChange={(e) => subTiltle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-400 outline-none rounded"
        />
        {/* Blog Description */}
        <p className="mt-4 font-extrabold text-black ">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:p-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
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
            checked={isPublised}
            className="scale-125 cursor-pointer accent-green-600 "
            onChange={(e) => setIsPublised(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
