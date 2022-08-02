import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

// step 2: create a controller
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        // the max number of posts per page
        const LIMIT = 8;
        // starting index of the post for every page
        const startIndex = ((Number)(page) - 1) * LIMIT;

        // how many posts do we have
        const total = await PostMessage.countDocuments({});
        // sort the posts from latest to oldest
        // skip the previous posts
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// QUERY => /posts?page=1 => page = 1 query some data, such as search
// Params => /posts/:id => get some specific resources
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        // i stands ignore lower and upper case, thus test = TEST = Test
        const title = new RegExp(searchQuery, "i");
        // $or stands find all the posts that match one o0f those two criteria
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        res.json({ data: posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // id: _id  rename the param id to be _id
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // Note: mongoDB default id key is '_id',
    // so when we update the post, we need to map id to '_id'
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId)
        return res.json({ message: "unauthenticated" });
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}