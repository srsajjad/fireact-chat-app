import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import config from './Config'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
