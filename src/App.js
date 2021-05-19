import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'


class App extends React.Component {
  render() {
    return (
      <div className = 'header'>
          <NavBar />
          <main>
            <Switch>
                <Route exact path = '/'>Welcome to Youtube - Enhanced</Route>
                <Route path = '/home'>{Home}</Route>
                <Route path = '/about'>{About}</Route>
                <Route>{()=><h1>404: Page not found</h1>}</Route>
            </Switch>

          </main>
      </div>
    )
  }
}
export default App