import React from 'react'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import 'moment-duration-format'
import { v4 as uuid } from 'uuid'


const Home = ({info}) => {

    const videosDetails = info.videosDetails ?  info.videosDetails : []
    const searchResult = info.searchResult ? info.searchResult : []
    const isSearch = info.isSearch ? true : false
    
    const formatDuration = time => {
        const duration = moment.duration(time).format('h:mm:ss').padStart(4, '0:0')
        return duration === '0:00' ? 'LIVE' : duration}

    const loadMoreVideos = async () => {
        const {currentSearch, searchResult: { nextPageToken: token }} = this.state
    
    const { data: searchResult } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?pageToken=${token}&part=snippet&maxResults=25&q=${currentSearch}&type=video&key=${process.env.REACT_APP_API_KEY}`)
    
    const videosIds = searchResult.items.map(video => video.id.videoId).join(',')

    const {data: { items: videosDetails }} = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`)
}


let videosList = videosDetails.map(list => {
    const duration = formatDuration(list.contentDetails.duration)
    return (<VideoCard list={list} duration={duration} key={uuid()}/>)})

const displayInfo = !videosList.length ? (<h2>No video found</h2>) : (<ul className='videosList' id='content'>{videosList}</ul>)


return (
      <div id='outerDiv'>
        <div id='card'>
              {isSearch && displayInfo}
              {searchResult.nextPageToken && (
              <button className='load-more' onClick={loadMoreVideos}>
                Load more...
              </button>
              )}
        </div>
     </div>
)}

export default Home
