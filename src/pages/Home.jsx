import Bloglist from "../components/Bloglist";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
    </>
  );
};

export default Home;
