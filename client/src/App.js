import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chatt/Chat'

function App () {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Join} />
        <Route path='/chat' exact component={Chat} />
      </Router>
    </div>
  )
}

export default App
