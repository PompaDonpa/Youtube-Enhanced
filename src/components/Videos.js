import React from 'react'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

const Videos = ({ id }) => {
  const opts = {
    height: 480,
    width: 720,
    playerVars: {
      autoplay: 1,
    },
  };


  return (
    <div className='outerDiv'>
      <div className='videoContainer'>
          <br />
          <div className='videoBack'>
              <Button component={Link} to='/' variant='contained' color='primary'>
                  <Typography variant='h6' style={{textTransform: 'capitalize'}}>Go back</Typography>
              </Button>
          </div>
          <br />
          <div >
              <YouTube videoId={id} opts={opts}  />
          </div>
          <br />
      </div>
    
  </div>
  )
}

export default Videos
