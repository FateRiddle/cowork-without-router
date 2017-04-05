import React, { Component } from 'react'
import './App.css'
import { NavLink,BrowserRouter as Router,Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Route component={Nav} />
        </div>
    )
  }
}

App = connect()(withRouter(App))

const Nav = () => (
  <div>
    <NavLink exact to='/'>home</NavLink>
    <NavLink to='/node'>node</NavLink>
  </div>
)

export default App
