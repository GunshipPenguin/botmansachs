import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'

class UserPage extends Component {
  render ({
    match
  }) {
    const username = match.params.username || 'me'
    return (
      <div>
        User Page of {username}
      </div>
    )
  }
}

export default withRouter(UserPage)
