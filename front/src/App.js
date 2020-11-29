import React from 'react';
import Layout from './hocs/Layout'
import Home from './container/Home';
import About from './container/About';
import Contact from './container/Contact';
import ListingDetail from './container/ListingDetail';
import Listings from './container/Listings';
import Login from './container/Login';
import Signup from './container/Signup';
import NotFound from './components/Notfount'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './sass/main.scss';

import { Provider } from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/listings/:id' component={ListingDetail} />
            <Route exact path='/listings' component={Listings} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
