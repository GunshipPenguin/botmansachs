import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class SignInPage extends Component {
  state = {
    username: '',
    password: '',
    error: null,
  }

  componentDidMount() {
    const {
      username,
      history,
    } = this.props
    if (username) {
      history.push('/me')
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {
      dispatch,
      history,
    } = this.props
    const {
      username,
      password,
    } = this.state

    if (username.length === 0 || password.length === 0) {
      this.setState({
        error: 'Username and password are required',
      });
      return
    }

    if (username.length < 3) {
      this.setState({
        error: 'Username is too short',
      });
      return
    }

    if (password.length < 8) {
      this.setState({
        error: 'Password is too short',
      });
      return
    }

    // Promise.resolve({})
    fetch('http://localhost:8081/frontend_api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status >= 300) {
          res.json()
            .then(({ error }) => {
              this.setState({
                error,
              })
            })
          return
        }

        dispatch({
          type: 'LOGIN',
          username,
        })
        history.push('/me')
      })
      .catch(console.error)
  }

  render ({}, {
    username,
    password,
    error,
  }) {
    const styleLabel = {
      fontSize: 18
    }
    const styleInput = {
      backgroundColor: 'white',
      border: 'none',
      padding: 10,
      borderBottom: '4px solid #183440',
      width: '100%'
    }
    const styleButton = {
      backgroundColor: 'transparent',
      display: 'inline-block',
      color: 'white',
      border: '1px solid white',
      padding: '4px 10px',
      textDecoration: 'none',
      margin: '0 10px',
      minWidth: 72
    }
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          margin: 'auto',
          maxWidth: 512,
          padding: 10
        }}
      >
        <h1
          style={{
            textAlign: 'center'
          }}
        >
          Sign In
        </h1>

        <label>
          <p style={styleLabel}>
            Username
          </p>
          <input
            type="text"
            maxLength={24}
            value={username}
            style={styleInput}
            onInput={({ target }) => {
              this.setState({
                username: target.value.replace(/[^\d\w]/g, '')
              })
            }}
          />
        </label>

        <label>
          <p style={styleLabel}>
            Password
          </p>
          <input
            type="password"
            maxLength={64}
            value={password}
            style={styleInput}
            onInput={({ target }) => this.setState({ password: target.value })}
          />
        </label>

        <p
          style={{
            textAlign: 'center'
          }}
        >
          <input
            type="submit"
            style={styleButton}
            value="Sign in"
          />
        </p>

        {error && <p style={{ color: '#f33' }}>
          {error}
        </p>}

        <p>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({ username: state.username }),
    (dispatch) => ({ dispatch })
  )(SignInPage)
)
