import React from 'react';
import store from './store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderContainer from 'containers/HeaderContainer';
import HomeContainer from 'containers/HomeContainer';
import PlayerContainer from 'containers/PlayerContainer';
import SearchContainer from 'containers/SearchContainer';

const reduxstore = createStore(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={reduxstore}>
        <div style={{
          //maxWidth: '1100px',
          margin: '0 0',
          paddingBottom: '70px',
        }}>
          <Route component={HeaderContainer} />
          <div style={{clear: 'both'}}>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/search/:query" component={SearchContainer} />
              <Route path="/search/:query/:pnum" component={SearchContainer} />
            </Switch>
          </div>
          <PlayerContainer />
        </div>

      </Provider>
    </BrowserRouter>
  );
};

export default Root;