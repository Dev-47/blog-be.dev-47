import Blog from "../models/blog.model.js";

// GET /api/posts/

export const list_posts = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/posts/

export const create_post = async (req, res) => {
  const { title, body } = req.body;
  const { user: author } = req;

  const post = new Blog({
    title,
    body,
    author,
  });
  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/posts/:slug

export const get_post = async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/posts/:slug

export const update_post = async (req, res) => {
  const { title, body } = req.body;
  const { user: author } = req;

  try {
    const post = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        body,
        author,
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/posts/:slug

export const delete_post = async (req, res) => {
  try {
    await Blog.findOneAndDelete({ slug: req.params.slug });
    res.status(204).json(null);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
