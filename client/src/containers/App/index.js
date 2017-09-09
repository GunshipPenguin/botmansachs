import { h } from 'preact'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
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
)

const initialState = {
  username: null,
}

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
      }

    default:
      return state
  }
})

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <NavigationBar />
          <Switch>
            {routes.map(renderRoute)}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
