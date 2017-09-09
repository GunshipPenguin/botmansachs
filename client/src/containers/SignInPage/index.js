import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

class SignInPage extends Component {
  render () {
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
            maxLength={48}
            style={styleInput}
          />
        </label>

        <label>
          <p style={styleLabel}>
            Password
          </p>
          <input
            type="password"
            maxLength={64}
            style={styleInput}
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

        <p>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    )
  }
}

export default SignInPage
