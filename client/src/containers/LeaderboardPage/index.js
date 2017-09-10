import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    const searchQuery = search ? '&search_term=' + search : ''
    // Promise.resolve({ bots: [
    //     {
    //       'name': 'pennbot',
    //       'rank': 1,
    //       'holdings': 15212
    //     },
    //     {
    //       'name': 'traderbot6',
    //       'rank': 2,
    //       'holdings': 12444
    //     },
    //     {
    //       'name': 'asdfbot',
    //       'rank': 3,
    //       'holdings': 2222
    //     },
    //     {
    //       'name': 'brickbreaker',
    //       'rank': 4,
    //       'holdings': 1111
    //     }
    //   ].filter(x => !search || x.name.match(search))
    // })
    fetch(`http://localhost:8081/frontend_api/bots?after=0&limit=200${searchQuery}`)
      .then((res) => res.json())
      .then(({ bots }) => {
        this.setState({ bots: bots.map(x => ({
          ...x,
          holdings: Math.round(x.holdings),
        })) })
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
          {bots.map((bot) => {
            const holdings = bot.cash + bot.stocks
              .reduce((result, stock) => result + stock.quantity * stock.price, 0)
            return (
              <div
                key={bot.rank + bot.name + holdings}
                style={{
                  fontSize: 18,
                  padding: '6px 10px',
                  borderBottom: '1px solid white'
                }}
              >
                <Link to={`/leaderboard/${bot.name}`}>
                  {bot.name}
                </Link>
                &nbsp;
                <span
                  style={{
                    float: 'right',
                    color: '#99c12a',
                    fontWeight: 'bold'
                  }}
                >
                  {numberWithCommas(holdings)} $
                </span>
              </div>
            )}
          )}
        </div>
      </div>
    )
  }
}

export default LeaderboardPage
