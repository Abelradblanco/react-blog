  import Navbar from './Navbar';
  import Home from './Home';
  import Edit from './Edit';
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
  import Create from './Create';
  import BlogDetails from './BlogDetails';
  import NotFound from './NotFound';

  function App() {

    return (
      <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route  path="/create">
              <Create/>
            </Route> 
            <Route path="/blogs/:id" component={BlogDetails} /> {/* Updated route */}
            <Route path="/edit/:id" component={Edit} /> {/* New route for editing */}
            <Route path="*">
              <NotFound/>
            </Route>
        </Switch>
        </div>
      </div>
      </Router>
    );
  }

  export default App;
