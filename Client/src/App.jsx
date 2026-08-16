import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddBlog from "./pages/Admin/AddBlog";
import ListBlog from "./pages/Admin/ListBlog";
import Comment from "./pages/Admin/Comment";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContex";

const App = () => {
  const { token } = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Blog Content */}
        <Route path="/blog/:id" element={<Blog />} />
        {/* Admin Layout */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="listblog" element={<ListBlog />} />
          <Route path="comments" element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
