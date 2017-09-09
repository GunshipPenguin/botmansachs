import { h, Component } from 'preact'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    const styleButton = {
      backgroundColor: 'transparent',
      display: 'inline-block',
      color: '#ffffff',
      border: '1px solid #ffffff',
      padding: '4px 10px',
      textDecoration: 'none',
      margin: '0 10px',
      minWidth: 72,
    }
    return (
      <div
        style={{
          margin: 'auto',
          maxWidth: 768,
          padding: 10
        }}
      >
        <h1>
          Botman Sachs
        </h1>

        <p>
          Program your bot and compete globally in a stock market simulation
        </p>

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <Link
            to="/signup"
            style={styleButton}
          >
            Get Started
          </Link>

          <Link
            to="/leaderboard"
            style={styleButton}
          >
            View Leaderboard
          </Link>
        </div>

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <h3>
            Knowledge
          </h3>
          <img
            src="/assets/graphics/ic_device_hub_white_96px.svg"
            alt=""
            aria-labelledby="knowledge"
          />
          <p id="knowledge">
            Access realtime stock market data and recent news articles
          </p>

          <h3>
            Memory
          </h3>
          <img
            src="/assets/graphics/ic_memory_white_96px.svg"
            alt=""
            aria-labelledby="memory"
          />
          <p id="memory">
            Accumulate your research and make an informed decision
          </p>

          <h3>
            Trade
          </h3>
          <img
            src="/assets/graphics/ic_swap_horiz_white_96px.svg"
            alt=""
            aria-labelledby="trade"
          />
          <p id="trade">
            Buy and sell stocks and compete with others for the best returns
          </p>
        </div>
      </div>
    )
  }
}

export default HomePage
