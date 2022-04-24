const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {validateCreatePost} = require("../validator/post");
const auth = require("../middleware/auth");
const checkToken = require("../middleware/isAdmin");
const postPolicy = require("../middleware/postPolicy");


router.post("/create", auth, validateCreatePost, PostController.createPost);
router.get("/", auth, checkToken, PostController.findAll);
router.get("/:id", auth, PostController.show, postPolicy.show);
router.patch("/:id", auth, PostController.update, postPolicy.update);


module.exports = router;