import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Markdown from 'react-markdown'
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
botmansachs.__register_bot__('${username}')

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
          <div style={{ margin: 'auto', maxWidth: 768, textAlign: 'left'}}>
          <Markdown source={`
# Botman Sachs API

## Blackrock API

Query a Blackrock API for financial information. Blocks until the request is
complete.

[Blackrock API Reference](https://www.blackrock.com/tools/api-tester/hackathon)


**Example**

\`botmansacs.query_blackrock_api(api_name, query)\`


**Parameters**

\`api_name\` is a \`string\` and must be one of

* \`performance-data\`
* \`portfolio-analysis\`
* \`search-securities\`
* \`security-data\`


\`query\` is a dictionary of key value pairs representing the query string that
will be sent alongside your request


**Response**


Returns a JSON string.


## Yahoo Finance API

Query the yahoo finance API for information on a particular stock. Data returned
is a dictionary of the form {price: int, name: str}. Blocks until the information
is retrieved.


**Example**


\`botmansacs.query_yahoo_finance_api(symbol)\`


**Parameters**


\`symbol\` is a string of a company symbol.

For example, \`msft\` is Microsoft's symbol.


**Response**


Returns a dictionary with keys \`price\` and \`name\`.


## Buy Stock

Buy the specified quantity of the specified stock, will return an error message if you
have insufficent funds or specify an invalid stock symbol. Blocks until the buy is complete.


**Example**


\`botmansacs.buy(symbol, quantity)\`


**Parameters**

\`symbol\` is a string of a company symbol.

For example, \`msft\` is Microsoft's symbol.


\`quantity\` is a number representing how many stocks will be bought.


**Response**

None if it succeeds.

Error as JSON if there is an error.


## Sell Stock


**Response**

## Sell Stock

Sell the specified quantity of the specified stock,  will return an error message if you
don't have enough stock or specify an invalid stock symbol. Blocks until the sell is complete.


**Example**

\`botmansachs.sell(symbol, quantity)\`


          `} />
          </div>
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
