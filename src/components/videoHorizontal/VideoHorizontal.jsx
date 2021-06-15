import React,{useEffect,useState} from 'react'
import "./_videoHorizontal.scss";

// import Profile from "../../images/profile.jpg";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import moment from "moment";
import numeral from 'numeral';
import {useHistory} from 'react-router-dom'

import { AiFillEye } from 'react-icons/ai';

import request from '../../api';
import { Col, Row } from 'react-bootstrap';


const VideoHorizontal = ({video,searchScreen}) => {

    const [views,setViews] = useState(null);
    const [duration,setDuration] = useState(null);
    const [channelIcon,setChannelIcon] = useState(null);

    // console.log(video)

    const {id,snippet:{channelId,channelTitle,publishedAt,thumbnails,title,description}} = video;

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

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds*1000).format('mm:ss')

    const history = useHistory();
    
    const handleVideoClick = () => {
        history.push(`/watch/${_videoId}`);
    }

    const isVideo = id.kind === 'youtube#video'

    return (
        <Row className="videoHorizontal m-1 py-2 algin-algin-item-center" onClick={handleVideoClick}>
            <Col xs={6} md={searchScreen?4:6} className="videoHorizontal_left">
                <LazyLoadImage 
                    src={thumbnails?.medium?.url}
                    effect='blur'
                    className="videoHorizontal_thumbnail"
                    wrapperClassName='videoHorizontal_thumbnail-wrapper'
                />
                <span className="videoHorizontal_duration">{_duration}</span>
            </Col>
            <Col xs={6} md={searchScreen?8:6} className="videoHorizontal_right p-0">
                <p className="videoHorizontal_title mb-1">
                    {title}
                </p>
                <div className="videoHorizontal_details">
                   <AiFillEye />{numeral(views).format("0.a")} Views |&nbsp;&nbsp;
                    {moment(publishedAt).fromNow()}
                </div>

                {
                    searchScreen && <p>{description}</p>
                }

                <div className="videoHorizontal_channel d-flex algin-center my-1">
                {isVideo && 
                    <LazyLoadImage 
                    src={channelIcon}
                    effect='blur'
                    />            
                }
                    <p>{channelTitle}</p>
                </div>
            </Col>
        </Row>
    )
}

export default VideoHorizontal
