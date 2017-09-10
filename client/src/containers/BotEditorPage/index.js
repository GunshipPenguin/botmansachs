import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python'
import 'codemirror/keymap/sublime.js'

class BotEditorPage extends Component {
  state = {
    source: null,
    lastSaved: null,
  }

  componentDidMount() {
    const {
      history,
      username,
    } = this.props

    if (!username) {
      history.push('/signin')
      return
    }

    // Promise.resolve({ source: '' })
    fetch(`http://localhost:8081/frontend_api/mybot/${username}`)
      .then((res) => res.json())
      .then((bot) => {
        const source = bot.source ||
`import botmansachs

# Insert your trading code here ⚡
`
        this.editor.codeMirror.setValue(source)
        this.setState({ source })
      })
      .catch(console.error)

    document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.keyCode == 17) {
      this.isCtrl = true
    }

    if (event.keyCode == 83 && this.isCtrl == true) {
      event.preventDefault()
      event.stopPropagation();
      this.handleSave()
      return false
    }

    if (event.keyCode == 82 && this.isCtrl == true) {
      event.preventDefault()
      event.stopPropagation();
      this.handleRun()
      return false
    }
  }

  handleKeyUp = (event) => {
    if (event.keyCode == 17) {
      this.isCtrl = false
      return false
    }
  }

  handleSave = (event) => {
    if (event) {
      event.preventDefault()
    }
    const {
      username,
    } = this.props;
    const {
      source,
    } = this.state;
    console.log(source)

    // Promise.resolve({})
    fetch(`http://localhost:8081/frontend_api/mybot/${username}`, {
      method: 'PATCH',
      body: JSON.stringify({
        source,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => this.setState({ lastSaved: new Date() }))
      .catch(console.error)
  }

  handleRun = (event) => {
    if (event) {
      event.preventDefault()
    }

    const {
      history,
      username,
    } = this.props
    const {
      source,
    } = this.state;

    // Promise.resolve({})
    fetch(`http://localhost:8081/frontend_api/mybot/${username}`, {
      method: 'PATCH',
      body: JSON.stringify({
        source,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => history.push('/me'))
      .catch(console.error)
  }

  render ({}, {
    source,
    lastSaved,
  }) {
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
      <form onSubmit={this.handleRun}>
        <CodeMirror
          ref={(el) => this.editor = el}
          value={source}
          onChange={(source) => this.setState({ source })}
          options={{
            mode: 'python',
            keyMap: 'sublime',
            lineNumbers: true,
            readOnly: source === null,
          }}
          height="600"
        />
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <input
            type="button"
            style={styleButton}
            onClick={this.handleSave}
            value="Save"
          />
          <input
            type="submit"
            style={styleButton}
            value="Save and Exit"
          />
          {lastSaved && <p>Last saved {lastSaved.toLocaleTimeString()}</p>}
        </div>
      </form>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({ username: state.username })
  )(BotEditorPage)
)
