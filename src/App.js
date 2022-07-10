import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from 'react-redux-loading';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Details from './components/Details';
import AddQuestion from './components/AddQuestion';
import LeaderBoard from './components/LeaderBoard';
import SignUp from './components/SignUp';

import './App.css';
import { handleInitialData } from './redux/thunks/shared';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="App">
        <div className='overlay'>
          <Router>
            <Fragment>
              <LoadingBar />
              <NavBar />

                <Route exact path='/'>
                  <Home />
                </Route>

                <Route exact path='/add'>
                  <AddQuestion />
                </Route>

                <Route exact path='/leaderboard'>
                  <LeaderBoard />
                </Route>

                <Route exact path='/questions/:question_id'>
                  <Details />
                </Route>

                <Route exact path='/signup'>
                  <SignUp />
                </Route>

            </Fragment>
          </Router>
        </div>
      </div>
    );
  }
}

export default connect()(App);
// export default App;
