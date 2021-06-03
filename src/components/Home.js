import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "moment-duration-format";
import { v4 as uuid } from 'uuid'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: "",
            currentSearch: "",
            searchResult: {},
            videosDetails: [],
            isSearch: false,
        }
    }

    formatDuration = (time) => {
        const duration = moment.duration(time).format('h:mm:ss').padStart(4, '0:0');
        return duration === "0:00" ? "LIVE" : duration;
    }

    handleUserInput = (e) => {
        this.setState({ searchInput: e.target.value });
    }
    submitUserSearch = async (e) => {
        e.preventDefault();
        const searchInput = this.state.searchInput.trim();
        if (!searchInput) return;
        const { data: searchResult } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchInput}&type=video&key=${process.env.REACT_APP_API_KEY}`);
        const videosIds = searchResult.items.map(video => video.id.videoId).join(",");
        const { data: { items: videosDetails } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`);
        this.setState({
            searchInput: "",
            currentSearch: searchInput,
            searchResult,
            videosDetails,
            isSearch: true,
        })
    }
    loadMoreVideos = async () => {
        const { currentSearch, searchResult: { nextPageToken: token } } = this.state;
        const { data: searchResult } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?pageToken=${token}&part=snippet&maxResults=25&q=${currentSearch}&type=video&key=${process.env.REACT_APP_API_KEY}`);
        const videosIds = searchResult.items.map(video => video.id.videoId).join(",");
        const { data: { items: videosDetails } } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videosIds}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`);
        this.setState({
            searchResult,
            videosDetails: [...this.state.videosDetails, ...videosDetails]
        })
    }

    render() {
        const { searchInput, searchResult, videosDetails, isSearch } = this.state;
        const videosList = videosDetails.map(list => {
            const duration = this.formatDuration(list.contentDetails.duration);
            return (
                <li key={uuid()} className="single-video">
                    <div className="video-img">
                        <Link to={`/videos/${list.id}`}>
                            <img src={list.snippet.thumbnails.medium.url} alt="" />
                            <span className={duration === "LIVE" ? "stat-duration-live" : "stat-duration"}>
                                {duration}
                            </span>
                        </Link>
                    </div>
                    <div className="video-card">
                        <Link to={`/videos/${list.id}`}>
                            <span className="video-title">{list.snippet.title}</span>
                        </Link>
                        <p className="stat">
                            Views: {parseInt(list.statistics.viewCount).toLocaleString()}
                        </p>
                        <p>
                            <img src="https://api.iconify.design/bx:bxs-like.svg" alt="" />
                            {parseInt(list.statistics.likeCount || 0).toLocaleString()}&nbsp;&nbsp;&nbsp;
                            <img src="https://api.iconify.design/bx:bxs-dislike.svg" alt="" />
                            {parseInt(list.statistics.dislikeCount || 0).toLocaleString()}
                        </p>
                    </div>
                </li>
            )
        })
        const displayInfo = !videosList.length ? <h2>No video found</h2> : <ul className='videos-list'>{videosList}</ul>

        return (
            <div className='centered-div'>
                <form onSubmit={this.submitUserSearch} className='search-box'>
                    <input
                        type="text"
                        placeholder="Search for videos"
                        onChange={this.handleUserInput}
                        value={searchInput}
                    />
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
                {isSearch && displayInfo}
                {searchResult.nextPageToken && <button className="load-more" onClick={this.loadMoreVideos}>Load more...</button>}
            </div>
        )
    }
}
