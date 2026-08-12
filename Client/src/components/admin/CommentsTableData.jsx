import { assets } from "../../assets/assets";

const CommentsTableData = ({ comment, fetchComment, index }) => {
  const { blog, createdAt } = comment;
  const blogDate = new Date(createdAt);
  return (
    <tr className="border-y border-pink-500">
      <td className="px-6 py-4">
        <h1
          className="inline-flex items-center justify-center 
             w-5 h-5 rounded-full 
             bg-pink-500 text-white font-bold 
             shadow-md"
        >
          {index}
        </h1>
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>:{comment.name}
        <br />
        <br />
        <b className="font-medium text-gray-600">Comment</b>:{comment.content}
      </td>
      <td className="px-6 py-6 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-6">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-300 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt=""
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentsTableData;
