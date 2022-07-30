import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    // read url to see if we have a page param there
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    // why add currentID:
    // since each time we update the current post info, it will change the currentId
    // we then need to get new posts for each updating task done
    useEffect(() => {
        dispatch(getPosts());
    },[currentId, dispatch]);

    const searchPost = () => {
        if (search.trim()) {
            // dispatch => fetch search post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        } else {
            history.push('/');
        }
    }

    const handleKePress = (event) => {
        if (event.keyCode === 13) {
            // search post
            searchPost();
        }
    };

    const handleAdd = (tag) => {
        setTags([ ...tags, tag]);
    }

    const handleDelete = (tagToBeDeleted) => {
        setTags(tags.filter((tag) => tag !== tagToBeDeleted));
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts  setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch}  position="static" color="inherit">
                            <TextField name="search"
                                       variant="outlined"
                                       label="Search Moments"
                                       fullWidth value="TEST"
                                       value={search}
                                       onKeyPress={handleKePress}
                                       onChange={ (event) => {
                                            setSearch(event.target.value);
                                       }}
                            />
                            <ChipInput
                                style={{ margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost}
                                    classes={classes.searchButton}
                                    color="primary"
                                    variant="contained"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Paper elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default  Home;