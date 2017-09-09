import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'

/**
 * Async component loading when Route matches
 */
class AsyncRoute extends Component {
  state = {
    SomeComponent: null
  };

  componentWillMount () {
    const {
      getComponent,
      nextState
    } = this.props
    getComponent(nextState, (error, SomeComponent) => {
      this.setState({ SomeComponent })
    })
  }

  render = ({}, { SomeComponent }) => <SomeComponent />
}

export { AsyncRoute }

const createRenderRoute = (cb, higherOrderComponent) => (componentModule) => {
  if (higherOrderComponent) {
    cb(null, withRouter(higherOrderComponent(componentModule.default)))
  } else {
    cb(null, componentModule.default)
  }
}

const errorLoading = (err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  throw new Error('Asynchronous route loading failed.')
}

export default [
  // HomePage
  {
    path: '/',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../HomePage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // SignInPage
  {
    path: '/signin',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../SignInPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // SignUpPage
  {
    path: '/signup',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../SignUpPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // LeaderboardPage
  {
    path: '/leaderboard',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../LeaderboardPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // UserPage, mine
  {
    path: '/me',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../UserPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // BotEditorPage
  {
    path: '/me/bot',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../BotEditorPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  },
  // UserPage, someone else
  {
    path: '/leaderboard/:username',
    exact: true,
    getComponent (nextState, cb) {
      const renderRoute = createRenderRoute(cb)
      import('../UserPage')
        .then(renderRoute)
        .catch(errorLoading)
    }
  }
]
