import express from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js"

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
// patch is for updating exsting documents
// :id means dynamic
router.patch('/:id',updatePost);

export default router;