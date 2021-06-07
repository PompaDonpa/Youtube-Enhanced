import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import HomeIcon from '@material-ui/icons/Home'
import ExploreIcon from '@material-ui/icons/Explore'
import AddCommentIcon from '@material-ui/icons/AddComment'
import CodeIcon from '@material-ui/icons/Code'
import ArchiveIcon from '@material-ui/icons/Archive'
import Avatar from '@material-ui/core/Avatar'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';


function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },

  leftBar: {
    padding: theme.spacing(2, 0.3, 2, 0.3),
    flexDirection: 'column',
    backgroundColor: '#282936' //({ dracula }) => (dracula ? '#282936' :'#5de4c7' )
  },
  pd: {
    padding: theme.spacing(4.3, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}))



const Left = ({info, loadInfo, areButtonsDisabled, toggleButtons}) => {
  
  const classes = useStyles()

  const handleClickLeft= (Transition) => () => {
    setTransition(() => Transition);
    setOpenLeft(true);
  };

  const handleCloseLeft = () => {
    setOpenLeft(false);
  };

  const goHome = () =>{
    toggleButtons([false,true,true,true,'restart','home']) 
  }
  
  const [openLeft, setOpenLeft] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [ videosDetails, setVideosDetails ] = useState([])
  const [ moreInfo, setMoreInfo] = useState({})
  
  let currentSearch = info.currentSearch ?  info.currentSearch : []
  let token = info.searchResult ? info.searchResult.nextPageToken || info.searchResult.prevPageToken : []

  

  const loadMoreVideos = async () => {

      let { data: searchResult } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?pageToken=${token}&part=snippet&maxResults=25&q=${currentSearch}&type=video&key=${process.env.REACT_APP_API_KEY}`);
      let videosIds = searchResult.items.map(video => video.id.videoId).join(",");
      let { data: { items: videosDetailsNext } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`);

      let videosDetails = videosDetailsNext.map(vid => vid)
      
      setVideosDetails(videosDetails)
      let newInfo = { currentSearch, searchResult, videosDetails, isSearch: true}
      setMoreInfo(newInfo)
      loadInfo(newInfo)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.leftBar}>
              <Button component={Link} to='/' onClick={goHome}>
                  <HomeIcon style={{ color: '#add7ff', fontSize: 34 }} />
              </Button>
              <Tooltip title="Explore Most Viewed">
              <Button disabled={areButtonsDisabled[0]}>
                  <ExploreIcon style={{ color: '#ebff87', fontSize: 34 }}  onClick={()=> window.open('https://www.microsoft.com', '_blank')}/>
              </Button>
              </Tooltip>
              <Button disabled={areButtonsDisabled[1]}>
                  <AddCommentIcon style={{ color: '#00f769', fontSize: 34 }} />
              </Button>
              <Tooltip title="Save Video \ Discontinued">
              <Button disabled={areButtonsDisabled[2]}>
                  <ArchiveIcon style={{ color: '#ea51b2', fontSize: 34 }} />
              </Button>
              </Tooltip>
            <div className={classes.pd}>
              <Button onClick={()=> window.open('https://github.com/PompaDonpa/Youtube-Enhanced', '_blank')}>
                  <CodeIcon style={{ color: '#5b51ae', fontSize: 34 }} />
              </Button>
              <Button onClick={()=> window.open('https://github.com/PompaDonpa', '_blank')}>
                  <GitHubIcon style={{ color: '#83e8ff', fontSize: 30 }} />
              </Button>
              <Button onClick={()=> window.open('https://twitter.com/PompaDonpa', '_blank')}>
                  <svg width='2em' height='2em' viewBox='0 0 1231.051 1000'>
                    <path
                      d='M1231.051 118.453q-51.422 76.487-126.173 130.403q.738 14.46.738 32.687q0 101.273-29.53 202.791q-29.53 101.519-90.215 194.343q-60.685 92.824-144.574 164.468q-83.889 71.644-201.677 114.25q-117.788 42.606-252.474 42.606q-210.2 0-387.147-113.493q31.406 3.495 60.242 3.495q175.605 0 313.687-108.177q-81.877-1.501-146.654-50.409q-64.777-48.907-89.156-124.988q24.097 4.59 47.566 4.59q33.782 0 66.482-8.812q-87.378-17.5-144.975-87.04q-57.595-69.539-57.595-160.523v-3.126q53.633 29.696 114.416 31.592q-51.762-34.508-82.079-89.999q-30.319-55.491-30.319-120.102q0-68.143 34.151-126.908q95.022 116.607 230.278 186.392q135.258 69.786 290.212 77.514q-6.609-27.543-6.621-57.485q0-104.546 73.994-178.534Q747.623 0 852.169 0q109.456 0 184.392 79.711q85.618-16.959 160.333-61.349q-28.785 90.59-110.933 139.768q75.502-8.972 145.088-39.677z'
                      fill='#6c71c4'
                    ></path>
                  </svg>
              </Button>
              <Button onClick={()=> window.open('https://www.linkedin.com/in/dev-danielnaranjo/', '_blank')}>
                  <svg width='2em' height='2em' viewBox='0 0 666 680'>
                    <path
                      d='M0 98v498c0 47 37 84 84 84h498c23 0 45-11 59-25c15-15 25-34 25-59V98c0-47-37-84-84-84H84c-25 0-44 10-59 25C11 53 0 75 0 98zm90 66c0-32 26-60 58-60c33 0 60 28 60 60c0 33-27 59-60 59c-32 0-58-26-58-59zm161 411V270c0-7 7-13 12-13h85c12 0 12 14 12 23c24-24 55-30 87-30c78 0 128 37 128 119v206c0 7-6 13-12 13h-88c-7 0-12-7-12-13V389c0-31-9-48-44-48c-44 0-55 29-55 68v166c0 7-7 13-14 13h-87c-5 0-12-7-12-13zm-159 0V270c0-7 7-13 12-13h87c8 0 13 5 13 13v305c0 7-6 13-13 13h-87c-6 0-12-7-12-13z'
                      fill='#cb4b16'
                    ></path>
                  </svg>
              </Button>
              <Tooltip title="Docker \ To be implemented">
              <Button>
                  <svg width='2.8em' height='2.8em' viewBox='0 0 24 24'>
                    <path
                      className='uim-primary'
                      d='M21.805 10.077a2.627 2.627 0 0 0-1.632-.427a5.189 5.189 0 0 0-.844.074A3.18 3.18 0 0 0 17.9 7.581l-.287-.167l-.186.27a3.967 3.967 0 0 0-.51 1.187a2.819 2.819 0 0 0 .334 2.217a3.936 3.936 0 0 1-1.457.352H2.623a.622.622 0 0 0-.622.622a9.386 9.386 0 0 0 .575 3.385a5.078 5.078 0 0 0 2.004 2.607A8.868 8.868 0 0 0 8.977 19a13.486 13.486 0 0 0 2.44-.223a10.068 10.068 0 0 0 3.19-1.16a8.734 8.734 0 0 0 2.17-1.78a11.81 11.81 0 0 0 2.125-3.664h.185a3.052 3.052 0 0 0 2.236-.844a2.47 2.47 0 0 0 .594-.872l.083-.241z'
                      fill='currentColor'
                    ></path>
                  <path
                      className='uim-quaternary'
                      d='M3.847 11.06H5.61a.156.156 0 0 0 .157-.158V9.325a.156.156 0 0 0-.157-.157H3.847a.156.156 0 0 0-.158.157v1.577a.162.162 0 0 0 .158.158zm2.43 0H8.04a.156.156 0 0 0 .157-.158V9.325a.156.156 0 0 0-.157-.157H6.277a.156.156 0 0 0-.157.157v1.577a.162.162 0 0 0 .157.158m2.477 0h1.762a.156.156 0 0 0 .158-.158V9.325a.156.156 0 0 0-.158-.157H8.754a.156.156 0 0 0-.158.157v1.577a.151.151 0 0 0 .158.158zm2.44 0h1.762a.156.156 0 0 0 .158-.158V9.325a.156.156 0 0 0-.158-.157h-1.762a.156.156 0 0 0-.158.157v1.577a.156.156 0 0 0 .158.158zM6.277 8.806H8.04a.163.163 0 0 0 .157-.158V7.071a.156.156 0 0 0-.157-.157H6.277a.156.156 0 0 0-.157.157v1.577a.17.17 0 0 0 .157.158m2.477 0h1.762a.163.163 0 0 0 .158-.158V7.071a.156.156 0 0 0-.158-.157H8.754a.156.156 0 0 0-.158.157v1.577a.156.156 0 0 0 .158.158m2.44 0h1.762a.163.163 0 0 0 .158-.158V7.071a.163.163 0 0 0-.158-.157h-1.762a.156.156 0 0 0-.158.157v1.577a.163.163 0 0 0 .158.158m0-2.263h1.762a.156.156 0 0 0 .158-.158V4.808a.163.163 0 0 0-.158-.158h-1.762a.156.156 0 0 0-.158.158v1.577a.163.163 0 0 0 .158.158m2.458 4.517h1.762a.156.156 0 0 0 .158-.158V9.325a.156.156 0 0 0-.158-.157h-1.762a.156.156 0 0 0-.158.157v1.577a.162.162 0 0 0 .158.158'
                      opacity='.95'
                      fill='#3971ed'
                      ></path>
                  </svg>
               </Button>
               </Tooltip>
               <Tooltip title="Reload Videos">
               <Button disabled={areButtonsDisabled[3]}>
                    <AutorenewIcon style={{ color: '#a5e12d', fontSize: 34 }} onClick={loadMoreVideos} />
               </Button>
               </Tooltip>
            </div>
            <div className={classes.pd}>
            <Tooltip title="PompaDonpa">
                <Avatar style={{ color: '#001353', fontSize: 28, backgroundColor: '#6c71c4' }} onClick={handleClickLeft(TransitionLeft)} >
                    ⅌
                </Avatar>
                </Tooltip>
                <Snackbar
                  open={openLeft}
                  onClose={handleCloseLeft}
                  TransitionComponent={transition}
                  message="Daniel Naranjo \ PompaDonpa \ FullStack Web Developer \ 2021"
                  key={transition ? transition.name : ''}
                />
            </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Left
