import express from "express";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js"
import auth from '../middleware/auth.js';

const router = express.Router();

// step1: create a router
router.get('/', getPosts);
router.get('/search',getPostsBySearch);
router.post('/', auth, createPost);
// patch is for updating exsting documents
// :id means dynamic
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;