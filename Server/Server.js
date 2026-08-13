import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./Configs/db.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

// Connected Mongodb
await connectDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});

export default app;
