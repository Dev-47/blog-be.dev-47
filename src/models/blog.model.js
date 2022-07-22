import mongoose from "mongoose";
import slugify from "slugify";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    body: {
      type: String,
      required: true,
      minlength: 5,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
    },
  },
  { timestamps: true }
);

BlogSchema.pre("find", function (next) {
  this.populate("author", "username email");

  next();
});

BlogSchema.pre("findOne", function (next) {
  this.populate("author", "username email");

  next();
});

BlogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });

  next();
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
