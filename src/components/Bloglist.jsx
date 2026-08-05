import { blogCategories } from "../assets/assets";

const Bloglist = () => {
  return (
    <main>
      <section className="flex justify-between gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button>{item}</button>
          </div>
        ))}
      </section>
      <div>{/* Blog cards */}</div>
    </main>
  );
};


export default Bloglist