import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavigationBar extends Component {
  render ({ username }) {
    const height = 60
    const isLoggedIn = !!username
    const styleItem = {
      margin: ' 0 4px',
      height: 48,
      padding: 4
    }
    return (
      <div
        style={{
          height
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height,
            backgroundColor: '#183440',
            padding: 7,
            boxShadow: '1px 1px 2px #333',
            zIndex: 8,
          }}
        >
          <div
            style={{
              margin: 'auto',
              maxWidth: 768
            }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-block',
                fontSize: 26,
                padding: '4px 10px',
                border: '1px solid white',
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              BmS
            </Link>

            <div
              style={{
                display: 'flex',
                float: 'right'
              }}
            >
              <Link to="/leaderboard">
                <img
                  src="/assets/graphics/ic_star_rate_white_48px.svg"
                  alt="Leaderboard"
                  title="Leaderboard"
                  style={styleItem}
                />
              </Link>

              {!isLoggedIn && <Link to="/signup">
                <img
                  src="/assets/graphics/ic_person_add_white_48px.svg"
                  alt="Sign Up"
                  title="Sign Up"
                  style={styleItem}
                />
              </Link>}

              {!isLoggedIn && <Link to="/signin">
                <img
                  src="/assets/graphics/ic_person_white_48px.svg"
                  alt="Sign In"
                  title="Sign In"
                  style={styleItem}
                />
              </Link>}

              {isLoggedIn && <Link to="/me">
                <img
                  src="/assets/graphics/ic_person_white_48px.svg"
                  alt="My Profile"
                  title="My Profile"
                  style={styleItem}
                />
              </Link>}

              {isLoggedIn && <Link to="/me/bot">
                <img
                  src="/assets/graphics/ic_edit_white_48px.svg"
                  alt="Edit My Bot"
                  title="Edit My Bot"
                  style={styleItem}
                />
              </Link>}

              {/* {isLoggedIn && <Link to="/signout">
                <img
                  src="/assets/graphics/ic_logout_white_48px.svg"
                  alt="Sign out"
                  title="Sign out"
                  style={styleItem}
                />
              </Link>} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({ username: state.username })
)(NavigationBar)
