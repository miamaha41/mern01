import { Router } from "express";
import Post from "../models/Post.js";
import verifyToken from "../middleware/auth.js";
const router = Router();

/**
 * @router GET api/posts
 * @desc Read posts
 * @access Private
 */
router.use(verifyToken);
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
});

/**
 * @router POST api/posts
 * @desc create post
 * @access Private
 */

router.post("/", async (req, res) => {
  const { title, description, url, status } = req.body;
  //Simple validation function
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Created new post", post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal sever error!" });
  }
});
/**
 * @router PUT api/posts
 * @desc Update post
 * @access Private
 */
router.put("/:id", async (req, res) => {
  const { title, description, url, status } = req.body;
  //Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required!" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postsUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postsUpdateCondition,
      updatedPost,
      { new: true }
    );
    //User not authorized or post not found
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized!",
      });
    }
    res.json({ success: true, message: "Post updated", post: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal sever error!" });
  }
});
/**
 * @router DELETE api/posts
 * @desc delete post
 * @access Private
 */
router.delete("/:id", async (req, res) => {
  const postDeleteCondition = { _id: req.params.id, user: req.userId };
  const deletePost = await Post.findOneAndDelete(postDeleteCondition);

  //User not authorized or post not found
  if (!deletePost) {
    return res.status(401).json({
      success: false,
      message: "Post not found or user not authorized!",
    });
  }
  res.json({ success: true, message: "Post deleted", post: deletePost });
});
export default router;
