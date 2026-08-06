import { assets } from "../assets/assets";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <img src={assets.logo} alt="QuickBlog Logo" className="w-36 mb-5" />

            <p className="text-gray-600 text-sm leading-7">
              QuickBlog is a modern blogging platform where readers can discover
              insightful articles and writers can share ideas on technology,
              programming, lifestyle, travel, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-primary transition">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Resources</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Write for Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Follow Us</h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FaGithub />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FaInstagram />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  <FaXTwitter />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-10 pt-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 QuickBlog. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
