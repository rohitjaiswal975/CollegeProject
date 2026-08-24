import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContex";

const CommentsTableData = ({ comment, fetchComment, index }) => {
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approvedComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approved-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteComment = async () => {
    const confirm = window.confirm("Are you sure to delete comment");
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
              onClick={approvedComment}
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
            onClick={deleteComment}
            alt=""
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentsTableData;
