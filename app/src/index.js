import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
)

// Service worker set up
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register({
    onUpdate: registration => {
      const waitingServiceWorker = registration.waiting

      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener('statechange', event => {
          if (event.target.state === 'activated') {
            window.location.reload()
          }
        })
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
      }
    }
  })
} else {
  serviceWorker.unregister()
}
