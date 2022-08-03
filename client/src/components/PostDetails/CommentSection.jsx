import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
    console.log('post');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom>
                        {
                            comments.map((c,i) => (
                                <Typography key={i} gutterBottom variant="subtitle1">
                                    { c }
                                </Typography>
                            ))
                        }
                    </Typography>
                </div>
                { user?.result?.name  && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6"> Write a Comment </Typography>
                        <TextField
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth disabled={!comment.length}
                            color="primary" variant="contained"
                            onClick={handleComment}
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;