import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from '../shared/App.js'
import registerServiceWorker from './registerServiceWorker.js'

ReactDOM.hydrate(<App />, document.getElementById('root'))
registerServiceWorker()
