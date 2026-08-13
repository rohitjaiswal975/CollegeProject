import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_Email ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, Token: token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
