import React, { useState,useEffect } from 'react'
import "./_videos.scss";

import moment from "moment";
import numeral from 'numeral';

import { AiFillEye } from 'react-icons/ai';

import request from '../../api';

import {LazyLoadImage} from 'react-lazy-load-image-component';
import {useHistory} from 'react-router-dom';

const Videos = ({video}) => {

    const {id,snippet:{channelId,channelTitle,title,publishedAt,thumbnails:{medium}}} = video;

    const [views,setViews] = useState(null);
    const [duration,setDuration] = useState(null);
    const [channelIcon,setChannelIcon] = useState(null);

    const _videoId = id?.videoId || id;

    useEffect(()=>{

        const get_video_details = async () => {
            const {data:{items}} = await request('/videos',{
                params:{
                    part:'contentDetails,statistics',
                    id:_videoId,
                }
            })

            setDuration(items[0].contentDetails.duration);
            setViews(items[0].statistics.viewCount);

            // console.log(items)
        }
        get_video_details();
    },[_videoId])

    //for getting profile pic of channel
    useEffect(()=>{

        const get_channel_icons = async () => {
            const {data:{items}} = await request('/channels',{
                params:{
                    part:'snippet',
                    id:channelId,
                }
            })

            setChannelIcon(items[0].snippet.thumbnails.default.url)
            // console.log(items);
            
        }
        get_channel_icons()
    },[channelId])

    const history = useHistory();
    const handleVideoClick = () => {
        history.push(`/watch/${_videoId}`);
    }


    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds*1000).format('mm:ss')

    return (
        <div className="video" onClick={handleVideoClick}>
            <div className="video_top">
                {/* <img src={medium.url} alt="" /> */}
                <LazyLoadImage 
                    src={medium.url}
                    effect='blur'
                />
                <span className="video_duration">{_duration}</span>
            </div>
            <div className="video_title">
                {title}
            </div>
            <div className="video_details">
                <span>
                    <AiFillEye />{numeral(views).format("0.a")} Views
                </span>
                <span>
                    {moment(publishedAt).fromNow()}
                </span>
            </div>
            <div className="video_channel">
                {/* <img src={channelIcon} alt="img" /> */}
                <LazyLoadImage 
                    src={channelIcon}
                    effect='blur'
                />
                <p>{channelTitle}</p>
            </div>
        </div>
    )
}

export default Videos
