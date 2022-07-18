import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js"

const router = express.Router();

// step1: create a router
router.get('/', getPosts);
router.post('/', createPost);
// patch is for updating exsting documents
// :id means dynamic
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost', likePost);

export default router;