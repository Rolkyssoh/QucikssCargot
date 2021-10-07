import React, {useEffect, useState} from 'react';
import {Provider, connect} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import RootNavigator from './src/Navigation/Root';

const App = props => {
  return <RootNavigator user_current={props.currentUser} />;
};

const mapStateToProps = state => {
  return {
    currentUser: state.confirmationCode.currentUser,
  };
};

const AppConnected = connect(mapStateToProps)(App);

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <AppConnected />
    </Provider>
  );
};
