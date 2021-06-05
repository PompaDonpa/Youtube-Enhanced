import React, { useState } from 'react'
import axios from 'axios'
import './NavBar.css'

import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'


const StyledBadge = withStyles(theme => ({
  badge: {
          backgroundColor: '#b45bcf', 
          color: '#b45bcf', 
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation: '$ripple 1.2s infinite ease-in-out',
              border: '1px solid currentColor',
              content: '""'
            }
          },
          '@keyframes ripple': {
                  '0%': {
                          transform: 'scale(.8)',
                          opacity: 1
                        },
          '100%': {
                    transform: 'scale(2.4)',
                    opacity: 0
                  }
          }
}))(Badge)

const useStyles = makeStyles(theme => ({
  root: {
          flexGrow: 1,
          display: 'flex',
          '& > *': {
                  margin: theme.spacing(0)
          }
  },
  popMenu: { 
            backgroundColor: '#6272a4',
            padding: theme.spacing(2),
  },
  toolbar: {
            justifyContent: 'space-between',
            backgroundColor: ({ green }) => (green ? '#5de4c7' : '#282936')
  },
  menuButton: {
            marginRight: theme.spacing(2)
  },
  title:      {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                                      display: 'block'
            }
  },
  search:     {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(1),
                    width: 'auto'
            }
  },
  submitButton: {
            color: '#add7ff'
  },
  searchIcon:   {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
  },
  inputRoot:    {
            color: ({ dracula }) => (dracula ? '#ffffff' : '#ebff87')
  },
  inputInput:   {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(10)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                      width: '40ch',
                      '&:focus': {width: '40ch'}
            }
  }
}))


const NavBar = ({loadInfo}) => {
  
  const [anchorEl, setAnchorEl] = useState(null)
  const [auth, setAuth] = useState(true)
  const open = Boolean(anchorEl)
  const classes = useStyles()

  const handleChange = event => {
    setAuth(event.target.checked)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  const [ search, setSearch ] = useState('')
  const [ info, setInfo] = useState({})

  const handleUserInput = (e) => {
    let search = e.target.value
    setSearch(search)
  }
  
  const submitUserSearch = async (e) => {
    e.preventDefault();
    let searchInput = search.trim();
    
    if (!searchInput) return;

    let { data: searchResult } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchInput}&type=video&key=${process.env.REACT_APP_API_KEY}`);
    let videosIds = searchResult.items.map(video => video.id.videoId).join(",");
    let { data: { items: videosDetails } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`);

    let info = { searchResult, videosDetails, isSearch: true}
    setSearch('');
    setInfo(info)
    loadInfo(info)
  }

  return (
   
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>

          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuIcon />
          </IconButton>

          <Button>
            <svg width='9.5em' height='5em' viewBox='0 0 40 16'>
              <path
                d='M5.375 2.647l.006-.028l.016-.118l-.74-.004c-.668-.004-.873 0-.891.017c-.009.008-.24.885-.651 2.473c-.196.758-.361 1.363-.367 1.345s-.24-.883-.522-1.922a107.288 107.288 0 0 0-.524-1.901c-.01-.01-.906-.014-1.632-.008c-.105.001-.164-.205.938 3.299c.152.485.381 1.172.507 1.526c.146.408.25.724.321.987c.126.501.13.815.103 1.182c-.032.423-.036 3.413-.005 3.463c.024.038 1.425.056 1.558.02c.021-.006.035-.026.045-.139c.033-.097.036-.484.036-2.09V8.698l.09-.283c.059-.185.206-.672.328-1.082l.327-1.09c.529-1.724 1.033-3.419 1.047-3.516l.011-.079z'
                fill='#5b51ae'
              ></path>
              <path
                d='M13.221 5.135v.107h-.017l-.009 2.953l-.009 2.863l-.229.233c-.257.261-.462.361-.648.314c-.203-.051-.197.028-.214-3.356l-.016-3.115h-1.474v.107h-.017v3.38c0 3.621 0 3.619.184 3.982c.146.29.36.431.725.479c.481.064 1-.154 1.481-.622l.209-.203v.351c0 .303.009.353.064.368c.09.025 1.206.027 1.326.002l.1-.021v-.104l.017-.003V5.114l-1.472.02z'
                fill='#5b51ae'
              ></path>
              <path
                d='M9.483 6.661c-.14-.599-.401-1.002-.832-1.28c-.676-.437-1.449-.484-2.165-.13c-.522.258-.859.686-1.032 1.314a1.383 1.383 0 0 0-.047.231c-.044.222-.049.552-.061 2.093c-.018 2.374.01 2.656.307 3.195c.292.529.897.917 1.556.997c.198.024.6-.013.832-.078c.525-.146 1.029-.561 1.252-1.032a1.8 1.8 0 0 0 .189-.604c.065-.353.07-.925.07-2.381c0-1.857-.006-2.06-.068-2.326zM7.802 11.5a.688.688 0 0 1-.515.098c-.135-.029-.318-.241-.374-.434c-.07-.241-.075-3.594-.015-4.251c.1-.329.378-.501.682-.419c.237.064.358.212.427.523c.051.231.057.518.046 2.207c-.007 1.12-.011 1.668-.048 1.962c-.037.185-.099.235-.203.315z'
                fill='#5b51ae'
              ></path>
              <path
                d='M35.944 8.346h.712l-.011-.645c-.011-.592-.02-.659-.099-.82c-.125-.253-.309-.366-.601-.366c-.351 0-.573.17-.678.518c-.045.148-.092 1.167-.058 1.255c.019.049.121.058.735.058z'
                fill='#6c71c4'
              ></path>
              <path
                d='M31.184 6.879a.49.49 0 0 0-.477-.278a.914.914 0 0 0-.508.203l-.127.097v4.634l.127.097c.288.22.604.266.822.12a.482.482 0 0 0 .186-.263c.057-.164.062-.375.055-2.325c-.008-2.032-.012-2.152-.078-2.285z'
                fill='#6c71c4'
              ></path>
              <path
                d='M40.014 4.791c-.142-1.701-.255-2.253-.605-2.962C38.944.89 38.273.395 37.317.286c-.739-.084-3.521-.203-6.094-.26c-4.456-.099-11.782.092-12.718.331a2.252 2.252 0 0 0-1.094.634c-.591.588-.944 1.432-1.085 2.6c-.323 2.666-.33 5.886-.019 8.649c.134 1.188.41 1.96.928 2.596c.323.397.881.734 1.379.835c.35.071 2.1.169 4.65.26c.38.014 1.385.037 2.235.052c1.77.031 5.025.013 6.886-.039c1.252-.035 3.534-.128 3.961-.161c.12-.009.398-.027.618-.039c.739-.042 1.209-.196 1.65-.543c.571-.449 1.013-1.278 1.2-2.251c.177-.92.295-2.559.319-4.42c.02-1.555-.007-2.393-.119-3.741zM22.27 4.175l-.828.01l-.036 8.83l-.718.009c-.555.008-.724-.001-.737-.036c-.01-.025-.021-2.016-.026-4.424l-.009-4.379l-1.617-.02v-1.38l4.779.019l.02 1.36l-.828.01zm5.077 5.061v3.797h-1.308v-.4c0-.301-.011-.4-.047-.4c-.026 0-.144.099-.263.22c-.259.263-.565.474-.827.572c-.542.203-1.056.084-1.275-.293c-.201-.345-.204-.423-.204-4.005v-3.29h1.307l.01 3.098c.01 3.044.011 3.1.084 3.224c.097.164.244.209.478.144c.138-.038.232-.105.455-.327l.282-.28V5.437h1.308v3.797zm5.102 3.255c-.115.257-.372.508-.583.57c-.549.162-.99.03-1.499-.449c-.158-.149-.305-.269-.327-.269c-.027 0-.041.116-.041.345v.345h-1.308V2.785h1.308v1.672c0 .919.012 1.672.027 1.672s.153-.122.307-.27c.354-.341.649-.491 1.024-.519c.669-.051 1.068.294 1.25 1.08c.057.245.062.525.062 2.798c0 2.768 0 2.78-.221 3.273zm5.535-1.52a4.706 4.706 0 0 1-.077.727c-.182.674-.666 1.152-1.366 1.348c-.942.264-1.98-.168-2.394-.997c-.232-.465-.241-.558-.241-2.831c0-1.853.007-2.081.066-2.334c.168-.715.584-1.178 1.289-1.435c.204-.074.417-.113.63-.117c.761-.016 1.515.393 1.832 1.059c.213.449.24.642.261 1.908l.019 1.136l-2.789.019l-.01.763c-.015 1.077.058 1.408.349 1.603c.244.165.62.152.824-.027c.192-.168.246-.349.265-.877l.017-.463h1.347l-.022.518z'
                fill='#6c71c4'
              ></path>
            </svg>
          </Button>

          <div className={classes.search}>
              <div className={classes.searchIcon}>
                  <SearchIcon />
              </div>

              <div>
                  <InputBase 
                      placeholder='Search' 
                      classes={{root: classes.inputRoot, input: classes.inputInput}}
                      inputProps={{ 'aria-label': 'search' }}
                      value={search}
                      onChange={handleUserInput}
                      onKeyPress={(e) => e.key === 'Enter' && submitUserSearch(e)} />

                  <Button className={classes.submitButton} nClick={submitUserSearch} >Submit</Button>
              </div>
          </div>

          <FormGroup>
            <FormControlLabel
                control={<Switch checked={auth} onChange={handleChange} aria-label='login switch'/>}
                label={auth ? 'Dracula' : 'Pumice'}
            />
          </FormGroup>

          <div>
            <StyledBadge overlap='circle' anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} variant='dot'>
                  <Avatar
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleMenu}
                        color='inherit'
                        style={{ color: '#83e8ff', fontSize: 30, backgroundColor: 'rgba(175, 182, 213, 0.31)' }}
                  >🧛🏻‍♂️</Avatar>
            </StyledBadge>
            
            <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleClose}
            >
              <MenuItem className = {classes.popMenu} onClick={()=> window.open('https://draculatheme.com/', '_blank')}>Dracula Theme</MenuItem>
              <MenuItem className = {classes.popMenu} onClick={()=> window.open('https://draculatheme.com/contribute', '_blank')}>Color Pallete</MenuItem>
            </Menu>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
