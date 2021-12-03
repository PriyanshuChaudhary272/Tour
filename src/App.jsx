import React from "react";
import Home from "./components/home/Home";
import Campgrounds from "./components/Campground";
import Showcampground from "./components/Showcampground";
import Editcampground from "./components/Editcampground";
import Newcampground from "./components/Newcampground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Errorhandler from "./components/Errorhandler";
import Fake from "./components/fake"
import Register from "./components/register";
import Login from "./components/login"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/registers" exact component={Register} />
                <Route path="/logins" exact component={Login} />
                <Route path="https://condescending-elion-7f0a44.netlify.app/campgrounds" exact component={Campgrounds} />
                <Route path="/campgrounds/add" exact component={Newcampground} />
                <Route path='/campgrounds/:id' exact component={Showcampground} />
                <Route path="/campgrounds/:id/edit" exact component={Editcampground} />
                <Route path="/" exact component={Home} />
                <Route path="/fake" exact component={Fake} />
                <Route path="/campgrounds/error/:message/:status" exact component={Errorhandler} />
                <Route component={Errorhandler} />
            </Switch>
            <Footer />
        </Router>
    )
}
export default App;