import React from 'react';
import { Router, Route, Switch } from "react-router-dom";


//Pages
import HomePage from './pages/homePage/HomePage';
import UserPage from './pages/userPage/UserPage';
import Toast from './components/toast/Toast';
import FullScreenLoader from './components/fullScreenLoader/FullScreenLoader';


//Helpers
import history from './history';

//Styles
import './styles/App.scss';


const App = () => {
  return (
    <div className="App">
      <FullScreenLoader
        message="Welcome to Haud Systems" 
      />
      <Toast />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/single-user/:id?/:name?" component={UserPage} />
        </Switch>
      </Router>
      <div className="footer">
        © 2020 by <span>Kingsley Seimodei</span> for Haud Systems.
      </div>
    </div>
  );
};


export default App;
