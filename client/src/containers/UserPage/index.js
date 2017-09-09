import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

class UserPage extends Component {
  state = {
    tab: 'stocks'
  }

  render ({}, { tab }) {
    const user = {
      'rank': 2,
      'name': 'pennbot',
      'holdings': 15212,
      'cash': '212',
      'history': [
        { 'timestamp': 1234453235, 'holdings': 12000 },
        { 'timestamp': 1234453245, 'holdings': 11000 },
        { 'timestamp': 1234453255, 'holdings': 11500 },
        { 'timestamp': 1234453265, 'holdings': 11829 },
        { 'timestamp': 1234453275, 'holdings': 13022 }
      ],
      'stocks': [
        {
          'symbol': 'AAPL',
          'name': 'Apple Inc.',
          'shares': 200
        },
        {
          'symbol': 'MSFT',
          'name': 'Microsoft Corporation',
          'shares': 125
        }
      ]
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
        <h1>{user.name}</h1>

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h2>Holdings</h2>
          <div
            style={{
              width: 96,
              height: 96,
              border: '4px solid #99c12a',
              borderRadius: '50%',
              color: '#99c12a',
              margin: '4px auto',
              fontWeight: 'bold',
              fontSize: '24px',
              lineHeight: '3.6'
            }}
          >
            {user.holdings} $
          </div>
          <div
            style={{
              fontWeight: 'bold'
            }}
          >
            Cash <span style={{ color: '#99c12a' }}>{user.cash} $</span>
          </div>
          <div
            style={{
              fontWeight: 'bold'
            }}
          >
            Stocks <span style={{ color: '#99c12a' }}>{user.holdings - user.cash} $</span>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h2>Rank</h2>
          <div
            style={{
              width: 96,
              height: 96,
              border: '4px solid #99c12a',
              borderRadius: '50%',
              color: '#99c12a',
              margin: '4px auto',
              fontWeight: 'bold',
              fontSize: '24px',
              lineHeight: '3.6'
            }}
          >
            {user.rank}
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
                  color: 'red'
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
                  color: 'red'
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
                {user.stocks.map((stock) => (
                  <div
                    key={stock.symbol + stock.shares}
                    style={{
                      fontSize: 18,
                      padding: '6px 10px',
                      borderBottom: '1px solid white'
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
                      {stock.shares} shares
                    </span>
                    &nbsp;
                    {stock.value && <span
                      style={{
                        color: '#99c12a',
                        fontWeight: 'bold'
                      }}
                    >
                      {stock.value} $ per
                    </span>}
                  </div>
                ))}
              </div>
            )}

            {tab === 'history' && (
              <div style={{ overflowX: 'scroll' }}>
                <Line
                  data={{
                    labels: user.history.map((x) => x.timestamp),
                    datasets: [
                      {
                        label: 'Holdings',
                        data: user.history.map((x) => x.holdings)
                      }
                    ]
                  }}
                  width={user.history.length * 30}
                  height={300}
                  options={{
                    responsive: false,
                    legend: {
                      labels: {
                        fontColor: 'white'
                      }
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

export default withRouter(UserPage)
