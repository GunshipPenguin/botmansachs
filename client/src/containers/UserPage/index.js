import { h, Component } from 'preact'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class UserPage extends Component {
  state = {
    tab: 'stocks',
    user: null,
  }

  componentDidMount() {
    const {
      history,
      username,
      match,
    } = this.props
    if (match.url === '/me' && !username) {
      history.push('/signin')
      return
    }

    this.fetchBot()
    this.interval = setInterval(this.fetchBot, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchBot = () => {
    const {
      match,
    } = this.props
    const username = match.path === '/me'
      ? this.props.username
      : match.params.username
    // Promise.resolve({
    //   'rank': Math.round(Math.random() * 50),
    //   'name': username,
    //   'cash': 10000,
    //   'history': [
    //     { 'timestamp': 1234453235000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453245000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453255000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453265000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453275000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453235000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453245000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453255000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453265000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453275000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453235000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453245000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453255000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453265000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //     { 'timestamp': 1234453275000, 'holdings': Math.round(Math.random() * 100000) + 10000 },
    //   ],
    //   'stocks': [
    //     {
    //       'symbol': 'AAPL',
    //       'name': 'Apple Inc.',
    //       'shares': Math.round(Math.random() * 100),
    //       'value': 1400,
    //     },
    //     {
    //       'symbol': 'MSFT',
    //       'name': 'Microsoft Corporation',
    //       'shares': Math.round(Math.random() * 125),
    //       'value': 400,
    //     }
    //   ]
    // })
    fetch(`http://localhost:8081/frontend_api/bots/${username}`)
      .then((res) => res.json())
      .then((user) => {
        this.setState({ user })
      })
      .catch(console.error)
  }


  render ({}, { tab, user }) {
    if (!user) {
      return
    }
    // cash + total value of stocks
    const holdings = user.cash + user.stocks
      .reduce((result, stock) => result + stock.quantity * stock.price, 0)
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
        <h1>{user.name}</h1>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
            <h2>Holdings</h2>
            <div
              style={{
                width: 144,
                height: 144,
                border: '4px solid #99c12a',
                borderRadius: '50%',
                color: '#99c12a',
                margin: '4px auto',
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: 5.8,
              }}
            >
              {numberWithCommas(holdings)} $
            </div>
            <div>
              Cash <span style={{ color: '#99c12a' }}>{numberWithCommas(user.cash)} $</span>
            </div>
            <div>
              Stocks <span style={{ color: '#99c12a' }}>{numberWithCommas(holdings - user.cash)} $</span>
            </div>
          </div>

          <div
            style={{
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
            <h2>Rank</h2>
            <div
              style={{
                width: 144,
                height: 144,
                border: '4px solid #99c12a',
                borderRadius: '50%',
                color: '#99c12a',
                margin: '4px auto',
                fontWeight: 'bold',
                fontSize: '24px',
                lineHeight: 5.8,
              }}
            >
              {user.rank !== Number.MAX_SAFE_INTEGER ? numberWithCommas(user.rank) : '∅'}
            </div>
          </div>
        </div>

        <div
          style={{
            margin: '30px 0'
          }}
        >
          <button
            style={{
              ...styleButton,
              fontWeight: 'bold',
              margin: '0',
              padding: '8px 40px',
              borderBottom: 'none',
              ...(tab === 'stocks'
                ? {
                  color: '#3f6071',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
                : {}
              )
            }}
            onClick={() => this.setState({ tab: 'stocks' })}
          >
            Stocks
          </button>
          <button
            style={{
              ...styleButton,
              fontWeight: 'bold',
              margin: '0',
              padding: '8px 40px',
              borderBottom: 'none',
              borderLeft: 'none',
              ...(tab === 'history'
                ? {
                  color: '#3f6071',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
                : {}
              )
            }}
            onClick={() => this.setState({ tab: 'history' })}
          >
            History
          </button>
          <div
            style={{
              border: '1px solid white'
            }}
          >
            {tab === 'stocks' && (
              <div>
                {user.stocks.length === 0 && <p style={{ padding: '0 15px' }}>
                  No stocks.
                </p>}
                {user.stocks.map((stock) => (
                  <div
                    key={stock.symbol + stock.shares}
                    style={{
                      overflowX: 'scroll',
                      fontSize: 18,
                      padding: '6px 10px',
                      borderBottom: '1px solid white',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <a
                      href={`https://www.google.com/finance?q=${stock.symbol}`}
                      rel="nofollow"
                      target="_blank"
                    >
                      <span
                        style={{
                          fontWeight: 'bold'
                        }}
                      >
                        {stock.symbol}
                      </span>
                      &nbsp;
                      <span>
                        {stock.name}
                      </span>
                    </a>
                    &nbsp;
                    <span
                      style={{
                        color: '#db5120',
                        fontWeight: 'bold'
                      }}
                    >
                      {numberWithCommas(stock.shares)} shares
                    </span>
                    &nbsp;
                    {stock.value && <span
                      style={{
                        color: '#99c12a',
                        fontWeight: 'bold'
                      }}
                    >
                      {numberWithCommas(stock.value)} $
                    </span>}
                  </div>
                ))}
              </div>
            )}

            {tab === 'history' && (
              <div style={{ overflowX: 'scroll', padding: 15 }}>
                <Line
                  data={{
                    labels: user.history.map((x) =>
                      new Date(x.timestamp)
                        .toISOString()
                        .split('T')[0]
                    ),
                    datasets: [
                      {
                        label: 'Holdings',
                        data: user.history.map((x) => x.holdings),
                        backgroundColor: 'rgba(153, 193, 42, 0.8)',
                      }
                    ]
                  }}
                  width={Math.max(Math.min(window.innerWidth, 768) - 30, user.history.length * 15)}
                  height={300}
                  options={{
                    responsive: false,
                    legend: {
                      labels: {
                        fontColor: 'white'
                      }
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          fontColor: 'white',
                        }
                      }],
                      xAxes: [{
                        ticks: {
                          fontColor: 'white',
                        }
                      }]
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({
      username: state.username,
    }),
    (dispatch) => ({
      dispatch,
    })
  )(UserPage)
)
