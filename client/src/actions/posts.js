import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";
import {fetchPosts} from "../api";
// Actions creators
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        // destructure data const { data } = await api.xxx
        // also from server, the response is res.json({ data: posts});,
        // thus we need to destructure the data for two times
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        // execute updatePost functionality and get the current data as response
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}