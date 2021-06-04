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
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import GitHubIcon from '@material-ui/icons/GitHub'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#b45bcf', //'#44b700'
    color: '#b45bcf', //'#44b700'
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
  // egg: {
  //   width: '24px',
  //   height: '24px',
  //   transform: 'translateY(-1px)'
  // },
  toolbar: {
    justifyContent: 'space-between',
    backgroundColor: ({ green }) => (green ? '#5de4c7' : '#282936')
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: ({ dracula }) => (dracula ? '#ffffff' : '#ebff87')
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(10)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}))

const NavBar = ({loadInfo}) => {
  console.log( {loadInfo})
  const classes = useStyles()
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

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
  const [ sendinfo, setSendInfo ] = useState(info)
  const handleUserInput = (e) => {
    let search = e.target.value
    console.log(search)
    setSearch(search)
  }
  
  const submitUserSearch = async (e) => {
    e.preventDefault();
    console.log('search hit')
    let searchInput = search.trim();
    if (!searchInput) return;
    let { data: searchResult } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchInput}&type=video&key=${process.env.REACT_APP_API_KEY}`);
    let videosIds = searchResult.items.map(video => video.id.videoId).join(",");
    let { data: { items: videosDetails } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`);
    console.log(searchInput)
    console.log(searchResult)
    console.log(videosDetails)
    
    
    setSearch('');
    let info = { searchResult, videosDetails, isSearch: true}
    setInfo(info)
    loadInfo(info)

    
   
}

  return (
   
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
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
            {/* <svg width="5.42em" height="4em" viewBox="0 0 512 116"><path d="M159.89 17.93a20.552 20.552 0 0 0-14.471-14.47C132.73 0 81.666 0 81.666 0S30.6.105 17.913 3.565a20.552 20.552 0 0 0-14.47 14.47c-3.838 22.545-5.327 56.896.105 78.538a20.552 20.552 0 0 0 14.47 14.47c12.688 3.46 63.753 3.46 63.753 3.46s51.065 0 63.753-3.46a20.552 20.552 0 0 0 14.47-14.47c4.047-22.576 5.295-56.906-.105-78.642z" fill="red"></path><path fill="#FFF" d="M65.413 81.788l42.362-24.536l-42.362-24.537z"></path><path d="M491.237 33.24c5.557 0 9.751 1.048 12.687 3.04c2.936 1.993 5.034 5.138 6.292 9.438c1.258 4.299 1.782 10.17 1.782 17.72v12.269H485.05v3.774l.42 10.381c.314 2.307.839 3.985 1.677 5.033c.84 1.049 2.202 1.573 3.985 1.573c2.412 0 4.09-.943 4.928-2.83c.944-1.888 1.363-5.034 1.468-9.333l13.946.839c.105.629.105 1.468.105 2.516c0 6.606-1.783 11.535-5.453 14.785c-3.67 3.25-8.703 4.928-15.309 4.928c-7.969 0-13.526-2.516-16.672-7.444C471 95 469.322 87.24 469.322 76.86V64.172c.356-17.825 3.491-30.88 21.915-30.932zm-193.88 1.363v52.533c0 3.146.314 5.453 1.048 6.816c1.489 2.915 5.348 2.17 7.445.734a8.389 8.389 0 0 0 2.831-3.25V34.602h16.043v71.617h-12.583l-1.363-8.808h-.314c-3.46 6.606-8.599 9.961-15.414 9.961c-10.49-.026-13.057-7.584-13.668-15.26l-.04-.541a65.277 65.277 0 0 1-.133-3.492V34.603h16.147zm82.732 0v52.533c0 3.146.314 5.453 1.048 6.816c1.49 2.915 5.348 2.17 7.445.734a8.389 8.389 0 0 0 2.831-3.25V34.602h16.043v71.617h-12.583l-1.363-8.808h-.314c-3.46 6.606-8.599 9.961-15.414 9.961c-10.49-.026-13.057-7.584-13.668-15.26l-.04-.541a65.278 65.278 0 0 1-.133-3.492V34.603h16.148zM250.8 33.24c5.243 0 9.542 1.048 12.688 3.25c3.145 2.202 5.557 5.558 7.025 10.171c1.468 4.614 2.202 10.8 2.202 18.455v10.38c0 7.655-.734 13.737-2.202 18.35c-1.468 4.615-3.775 7.97-7.025 10.172c-3.25 2.097-7.655 3.25-13.107 3.25c-5.663.105-10.067-1.048-13.317-3.145c-3.25-2.202-5.558-5.558-6.92-10.171c-1.364-4.614-1.993-10.696-1.993-18.35V65.22c0-7.655.734-13.946 2.307-18.56c1.573-4.718 3.984-8.074 7.34-10.17c3.355-2.098 7.654-3.251 13.002-3.251zM432.622 4.509v37.748h.105c1.468-2.726 3.355-4.928 5.977-6.606a14.785 14.785 0 0 1 8.283-2.516c3.88 0 6.816 1.048 9.018 3.04c2.202 2.098 3.775 5.348 4.718 9.857c.915 4.368 1.435 10.409 1.467 18.027l.001.743v11.324c0 10.59-1.363 18.455-3.88 23.488c-2.62 5.033-6.605 7.55-12.058 7.55c-3.04 0-5.767-.734-8.283-2.097a14.68 14.68 0 0 1-5.35-5.392l-.208-.376h-.314l-1.678 6.816h-13.317V4.51h15.519zm-64.173 3.67V21.18h-15.938v85.039h-15.728V21.181H320.74V8.18h47.71zm-172.909 0l.01.04c.153.681 2.273 10.106 4.605 21.087l.184.87l.278 1.315l.186.883l.093.443l.186.888l.093.445l.185.891l.27 1.303c1.575 7.604 3.078 15.23 3.977 20.698h.42c.861-4.905 2.112-11.182 3.446-17.591l.35-1.674c.176-.838.352-1.676.53-2.512l.274-1.297a2039.272 2039.272 0 0 1 5.597-25.444l.03-.135l.048-.21h16.043l-18.56 66.165v31.771h-15.833V74.448h-.105l-18.35-66.27h16.043zm54.945 36.175c-2.202 0-3.67 1.154-4.613 3.566c-.944 2.411-1.363 6.081-1.363 11.22v22.334c0 5.243.419 9.122 1.258 11.43c.839 2.306 2.412 3.46 4.718 3.46c2.202 0 3.775-1.154 4.719-3.46c.944-2.308 1.363-6.187 1.363-11.43V59.139c0-5.138-.42-8.913-1.363-11.22c-.944-2.411-2.517-3.565-4.719-3.565zm184.968 2.098c-1.278 1.18-2.187 2.635-2.728 4.454l-.103.369v40.684c1.3 2.202 3.146 3.67 6.396 3.775c1.678 0 3.04-.629 4.09-1.887c1.048-1.258 1.782-3.356 2.201-6.292c.403-2.818.613-6.7.629-11.644V65.955c0-5.662-.21-9.961-.524-13.002c-.42-3.041-.943-5.243-1.887-6.501c-1.825-2.622-5.767-2.59-8.074 0zm55.47-2.412c-1.783.105-3.042.629-3.776 1.573c-.838 1.048-1.363 2.621-1.677 4.928c-.309 2.26-.415 10.16-.42 10.476v5.148h11.744v-4.54v.087c-.007 1.587-.04-.921-.112-4l-.01-.414c-.066-2.706-.162-5.723-.297-6.757c-.315-2.412-.84-4.09-1.678-5.033c-.839-.944-2.097-1.468-3.775-1.468z" fill="#282828"></path></svg> */}
          </Button>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div>
              <InputBase
                placeholder='Search'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={handleUserInput}
                onKeyPress={(e) => e.key === 'Enter' && submitUserSearch(e)}
                
              />
              <Button 
                    className={classes.submitButton}
                    onClick={submitUserSearch}
                    >Submit</Button>
            </div>
          </div>

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label='login switch'
                />
              }
              label={auth ? 'Dracula' : 'Pumice'}
            />
          </FormGroup>

          {/* {auth && ( */}
          <div>
          <StyledBadge
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant='dot'
          >
            <Avatar
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              style={{ color: '#83e8ff', fontSize: 24, backgroundColor: 'rgba(175, 182, 213, 0.31)' }}
            >🧛🏻‍♂️
            </Avatar>
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
              <MenuItem onClick={handleClose}>GitHub</MenuItem>
              <MenuItem onClick={handleClose}>Repo</MenuItem>
            </Menu>
          </div>
          {/* )} */}
          {/* <StyledBadge
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant='dot'
          >
            <Avatar
              alt='egghead'
              src='https://api.iconify.design/logos:egghead.svg'
              className={classes.egg}
            />
          </StyledBadge> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
