import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Videos from './components/Videos'
import Left from './components/Left'
import Console from './components/Console.js'
import './App.css'

const App = () => {
    
  const [ areButtonsDisabled, setAreButtonsDisabled ] = useState([false, true, true, true,'restart','home'])
  const [ info, setInfo ] = useState({})
  const [ url, setUrl ] = useState('')

  const toggleButtons = (reDo) => { setAreButtonsDisabled(reDo) }
  
  const loadInfo = (info) =>{ setInfo(info) } 

  const watch = (p) => { 
    toggleButtons([true,false,false,true,'none','restart'])
    setUrl(p)
  }
 
  const showVideo = (p) => { 
    console.log(p.match.params.id)
    return <Videos id={p.match.params.id} areButtonsDisabled={areButtonsDisabled}/>
  }
  
  
 
  return (
      <>
        <header className='header'>
          <NavBar loadInfo={loadInfo} toggleButtons={toggleButtons} areButtonsDisabled={areButtonsDisabled}/>
        </header>

        <div className='left-sidebar'>
            <Left info = {info} loadInfo={loadInfo} areButtonsDisabled={areButtonsDisabled} toggleButtons={toggleButtons}/>
        </div>

        <main className='main'>
           <Switch>
              <Route exact path='/'>
                  <Home info={info} watch={watch} videoId={''} areButtonsDisabled={areButtonsDisabled}/>
              </Route>
          
              <Route path="/videos/:id"  render={showVideo}/>
              <Route path="/videos/" >
                { url && <Redirect to={`/videos/${url}`} render={showVideo} areButtonsDisabled={areButtonsDisabled}/>}
              </Route>
              <Route>
                  {() => <h1>404: Page not found</h1>}
              </Route>
            </Switch>
            <div>
                <Console />
            </div>
        </main>
      </>
    )
  }
export default App
