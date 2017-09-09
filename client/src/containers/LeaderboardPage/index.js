import { h, Component } from 'preact'

class LeaderboardPage extends Component {
  state = {
    bots: null,
    search: '',
  }

  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = (search = null, flush = false) => {
    if (flush) {
      this.setState({ bots })
    }
    const searchQuery = search ? '&searchterm=' + search : ''
    Promise.resolve({ bots: [
        {
          'name': 'pennbot',
          'rank': 1,
          'holdings': 15212
        },
        {
          'name': 'traderbot6',
          'rank': 2,
          'holdings': 12444
        },
        {
          'name': 'asdfbot',
          'rank': 3,
          'holdings': 2222
        },
        {
          'name': 'brickbreaker',
          'rank': 4,
          'holdings': 1111
        }
      ].filter(x => !search || x.name.match(search))
    })
    // fetch(`https://api.botmansachs.com/frontend_api/bots?after=0&limit=200${searchQuery}`)
      // .then((res) => res.json())
      .then(({ bots }) => {
        this.setState({ bots })
      })
      .catch(console.error)
  }

  handleSearch = (event) => {
    event.preventDefault()
    this.fetchBots(this.state.search || null)
  }

  render ({}, { bots, search }) {
    if (!bots) {
      return
    }
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
      <div
        style={{
          margin: 'auto',
          maxWidth: 768,
          padding: 10
        }}
      >
        <h1>Leaderboard</h1>
        <form onSubmit={this.handleSearch}>
          <input
            type="search"
            maxLength={24}
            placeholder="Search"
            value={search}
            style={styleInput}
            onInput={({ target }) => this.setState({ search: target.value })}
          />

          <input
            type="submit"
            style={{
              ...styleButton,
              display: 'none'
            }}
            value="Search"
          />
        </form>
        <div
          style={{
            border: '1px solid white',
            borderBottom: 'none'
          }}
        >
          {bots.map((bot) => (
            <div
              key={bot.rank + bot.name + bot.holdings}
              style={{
                fontSize: 18,
                padding: '6px 10px',
                borderBottom: '1px solid white'
              }}
            >
              <span
                style={{
                  color: bot.rank === 1
                    ? '#e6c200'
                    : bot.rank === 2
                      ? '#b3b3b3'
                      : bot.rank === 3
                        ? '#cd7f32'
                        : undefined,
                  fontWeight: 'bold'
                }}
              >
                {bot.rank !== Number.MAX_SAFE_INTEGER ? bot.rank + '.' : '∅'}
              </span>
              &nbsp;
              <span>
                {bot.name}
              </span>
              &nbsp;
              <span
                style={{
                  float: 'right',
                  color: '#99c12a',
                  fontWeight: 'bold'
                }}
              >
                {bot.holdings} $
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default LeaderboardPage
