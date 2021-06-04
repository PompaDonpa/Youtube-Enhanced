import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Videos from './components/Videos'
import Left from './components/Left'
import Rigth from './components/Rigth'
import Console from './components/Console.js'
import './App.css'

const App = () => {
    const [ info, setInfo ] = useState({})
    const loadInfo = (info) =>{
       setInfo(info)
    } 
    console.log('APP')
    console.log(info)
    return (
      <>
        <header className='header'>
          <NavBar loadInfo={loadInfo}/>
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
              <Rigth />
              <Home info = {info}/>
            </Route>
            {/* <Route path='/home'>{Home}</Route> */}
            <Route path='/about'>{About}</Route>
            <Route path='/videos'>{Videos}</Route>
            <Route>{() => <h1>404: Page not found</h1>}</Route>
          </Switch>
          <div><Console /></div>
        </main>
      </>
    )
  }
export default App
