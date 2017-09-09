import { h } from 'preact'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes, { AsyncRoute } from './routes.js'
import NavigationBar from '../NavigationBar'

const renderRoute = route => (
  <Route
    key={route.path}
    render={() =>
      (<AsyncRoute
        getComponent={route.getComponent}
      />)
    }
    {...route}
  />
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Switch>
          {routes.map(renderRoute)}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
