import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Blog = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [comments, setcomments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchBlogData = async () => {
    const data = blog_data.find((item) => item._id === id);
    setData(data);
  };

  const fetchComments = () => {
    setcomments(comments_data);
  };

  const addcomment = async (e) => {
    e.preventDefault();
    console.log({ name, comment });
  };

  useEffect(() => {
    (fetchBlogData(), fetchComments());
  }, []);

  return data ? (
    <div className="relative">
      {/* Background gradient image */}
      <img
        src={assets.gradientBackground}
        alt="bg-Image"
        className="absolute -top-50 -z-10 opacity-50"
      />
      {/* Navbar component */}
      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Michael Brown
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-extrabold mb-5">Comments({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/5 border border-primary/5 max-w-xl rounded"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={assets.user_icon}
                    alt="profileImage"
                    className="w-6"
                  />
                  <p className="font-bold">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8 text-red-500">
                  {item.content}
                </p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comments Box */}
        <div className="max-w-3xl mx-auto">
          <p className="font-extrabold mb-4">Add Your Comment</p>
          <form
            onSubmit={addcomment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-400 rounded outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full p-2 border border-gray-400 rounded outline-none"
              placeholder="Comments"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-110 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Button */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-extrabold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:scale-110"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:scale-110"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white hover:scale-110"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  );
};

export default Blog;
