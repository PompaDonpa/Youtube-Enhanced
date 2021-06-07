import React from 'react'
import moment from 'moment'
import 'moment-duration-format'
import { v4 as uuid } from 'uuid'
import VideoCard from './VideoCard'


const Home = ({info, watch, videoId, areButtonsDisabled}) => {

  const videosDetails = info.videosDetails ?  info.videosDetails : []
  const isSearch = info.isSearch ? true : false
    
  const formatDuration = time => {
      const duration = moment.duration(time).format('h:mm:ss').padStart(4, '0:0')
      return duration === '0:00' ? 'LIVE' : duration}

  let videosList = videosDetails.map(list => {
      const duration = formatDuration(list.contentDetails.duration)
      return (
        <VideoCard 
                    key={uuid()}
                    list={list} 
                    duration={duration} 
                    watch={watch}  
                    videoId={videoId} 
                    areButtonsDisabled={areButtonsDisabled}/>
  )})


  const displayInfo = !videosList.length ? (<h2>No video found</h2>) : (<ul className='videosList' id='content'>{videosList}</ul>)


return (
      <div className='outerDiv'>
        <div id='card'>
              {isSearch && displayInfo}
        </div>
     </div>
)}

export default Home
