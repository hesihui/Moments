import React from 'react'
import {Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import {useParams, useHistory } from "react-router-dom";

import useStyles from './styles';

const PostDetails = () => {
    console.log('POST DETAILS');
    const {post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    // from posts/:id
    const { id } = useParams();


    return (
        <div>
            POST DETAILS
        </div>
    );
};

export default PostDetails;