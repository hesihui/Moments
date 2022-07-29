import './App.css';
import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => (
    // notice that for react-router-dom v6, we should use different syntax
    // <Routes>
    //      <Route path="/" exact element={ <Home /> }/>
    //      <Route path="/auth" exact element={ <Auth /> } />
    //  </Routes>
   <BrowserRouter>
       <Container maxWidth="xl">
           <Navbar />
           <Switch>
               <Route path="/" exact component={() => <Redirect to="/posts" />}/>
               <Route path="/posts" exact component={Home} />
               <Route path="/posts/search" exact component={Home} />
               <Route path="/posts/:id" component={PostDetails} />
               <Route path="/auth" exact component={Auth} />
           </Switch>
       </Container>
   </BrowserRouter>
);

export default App;
