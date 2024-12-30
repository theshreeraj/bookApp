const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

// multer storage object
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

// Configuration
cloudinary.config({
  cloud_name: "dldto4wb8",
  api_key: "4432393623232348791",
  api_secret: "your secret key",
});

const upload = multer({ storage: storage });

// middlewares
app.use(express.json());
app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// getbook

app.get("/api/getAllBooks", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json({ msg: "Books found", data: allBooks });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// createBook
app.post("/api/addBook", upload.single("file1"), async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // Ensure file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    // Save book details to the database
    const newBook = new Book({
      title,
      author,
      price,
      imageUrl: uploadResult.secure_url,
    });
    const savedBook = await newBook.save();

    res.status(201).json({ msg: "Book Added Successfully", data: savedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
