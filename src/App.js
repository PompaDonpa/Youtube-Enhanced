import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Video from './components/Video'
import Left from './components/Left'
import Rigth from './components/Rigth'
import Console from './components/Console.js'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <>
        <header className='header'>
          <NavBar />
        </header>
        <div className='left-sidebar'>
          <Left />
        </div>
        <main className='main'>
          <div className='backgg'>
            <Rigth />
          </div>
          
            <Rigth />
          
          <Switch>
            <Route exact path='/'>
              <Rigth />{Home}
            </Route>
            {/* <Route path='/home'>{Home}</Route> */}
            <Route path='/about'>{About}</Route>
            <Route path='/video'>{Video}</Route>
            <Route>{() => <h1>404: Page not found</h1>}</Route>
          </Switch>
          <div><Console /></div>
        </main>
      </>
    )
  }
}
export default App
