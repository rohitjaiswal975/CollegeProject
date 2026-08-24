import { useEffect, useState } from "react";
import CommentsTableData from "../../components/admin/CommentsTableData";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContex";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comment");
      console.log(data);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`border rounded-full px-4 py-1 cursor-pointer text-sm ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`border rounded-full px-4 py-1 cursor-pointer text-sm ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto scrollbar-none rounded-lg bg-white shadow mt-5">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentsTableData
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComment={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
