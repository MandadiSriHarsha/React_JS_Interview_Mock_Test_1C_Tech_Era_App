import {Route, Switch, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'

import DetailsRoute from './components/DetailsRoute'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/not-found" component={NotFound} />
    <Route exact path="/courses/:id" component={DetailsRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
